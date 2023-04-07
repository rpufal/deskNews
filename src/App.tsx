import { useState, useEffect } from 'react';
import { Card, Dropdown, Grid, Pagination, TestDropdown } from './components';
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
,{
  label: 'Category 2',
  value: 'category2',
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
    <div className="App" style={{display: "flex", justifyContent: "center",  flexDirection: "column"}}>
      <header className="App-header">
        <p>
          DeskNews
        </p>
      </header>
      <div style={{ paddingBlock: '25px' }}></div>
      <section style={{ alignSelf:"center",marginInline: '10%', width: "80%"}}>
        <TestDropdown filter={filter} setFilter={setFilter} options={options} />
      </section>
      {cardData.length === 0 && !requestError && (
      <section style={{ marginTop:"5%",marginInline: '10%', width: "80%", display: "flex", justifyContent: "center" ,alignItems: "center"}}>
          <h2>Please wait for the request to be finished..</h2>
      </section>
        )}
      {requestError && (
      <section style={{ marginTop:"5%",marginInline: '10%', width: "80%", display: "flex", justifyContent: "center" ,alignItems: "center"}}>
      <h2>Something went wrong with the request..</h2>
      </section>)}
      <div style={{ paddingBlock: '25px' }}></div>
      {cardData.length > 0 && !requestError && (
      <Grid>
        {cardData.map((card: CardItemProps, index) => {
          if (filter.currentPage === 1 && index < 8) {
            return <Card key={index+card.title} {...card} />
          }
        })}
      </Grid>)}
      <div style={{ marginInline: '10%' }}>
        <Pagination
          className="pagination-bar"
          currentPage={filter.currentPage}
          totalCount={cardData.length}
          pageSize={8}
          onPageChange={(page: number) => setFilter({...filter, currentPage: page})}
        />
      </div>
      <div style={{ paddingBlock: '25px' }}></div>
    </div>
  );
}

export default App;
