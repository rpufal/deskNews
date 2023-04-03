import { useState, useEffect } from 'react';
import { Card, Dropdown, Grid, Pagination } from './components';
import { CardItemProps } from './components/Card';

import './App.css';

interface CardData {
  list: CardItemProps[]
  empty: boolean
}

const options = [{
  label: 'All',
  value: 'all',
},{
  label: 'Category 1',
  value: 'category1',
}
]

function App() {
  const [cardData, setCardData] = useState([])
  const [filter, setFilter] = useState({
    currentPage: 1,
    pageSize: 8,
    category: "",
    keyWord: "",
  })
  const [requestError , setRequestError] = useState(false)

  useEffect(() => {
    fetch('https://cms.talkdesk.com/wp-json/web-api/v1/content/cards')
      .then(async response => {
        if (!response.ok) throw new Error('Something went wrong with the request')
        return response.json()
      })
      .then(({data}) => {
        setCardData(data.list) 
      })
      .catch(error => {
        console.log(error)
        setRequestError(true)
      })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>

      <div style={{ paddingBlock: '25px' }}></div>

      <section style={{ marginInline: '10%' }}>
        <Dropdown filter={filter} options={options} setFilter={setFilter}/>
      </section>

      {cardData.length === 0 && !requestError && (
          <h2>Please wait for the request to be finished..</h2>
        )}
      {requestError && (<h2>Something went wrong with the request..</h2>)}
      <div style={{ paddingBlock: '25px' }}></div>
      {cardData.length > 0 && !requestError && (
      <Grid>
        
        {cardData.map((card: CardItemProps, index) => {
          if (filter.currentPage === 1 && index < 8) {
            return <Card key={index+card.title} {...card} />
          }
        })}
      </Grid>)}
      <div style={{ paddingBlock: '25px' }}></div>

      <div style={{ marginInline: '10%' }}>
        <Pagination
          className="pagination-bar"
          currentPage={filter.currentPage}
          totalCount={100}
          pageSize={16}
          onPageChange={(page: number) => setFilter({...filter, currentPage: page})}
        />
      </div>

      <div style={{ paddingBlock: '25px' }}></div>
    </div>
  );
}

export default App;
