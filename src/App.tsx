import { useState, useEffect } from 'react';
import { Card, Grid, Pagination, Dropdown } from './components';
import { CardItemProps } from './components/Card';
import { $Warning, $FilterSection,
  $WarningSection, $ResetButton, $App, $Header, $H1 } from './styles';



const optionsB = [{
  label: 'All',
  value: 'all',
},
{
  label: 'Last Week',
  value: 'lastWeek',
},{
  label: 'Last Month',
  value: 'lastMonth',
}
]

const filterByCategory = (category: string, data: CardItemProps[]) => {
  return data.filter((data: CardItemProps) => {
    if (category === "all") {
      return true
    } else if (data.label.text === category) {
      return true
    }	
  })
}
const filterByDate = (date: string, data: CardItemProps[]) => {
  return data.filter((data: CardItemProps) => {
    if (date === "all") {
      return true
    } else if (date === "lastWeek") {
      return new Date(data.date) > new Date(new Date().setDate(new Date().getDate() - 7))
    } else if (date === "lastMonth") {
      return new Date(data.date) > new Date(new Date().setDate(new Date().getDate() - 30))
    }
  })
}

const filterByKeyWord = (keyWord: string, data: CardItemProps[]) => {
  return data.filter((data: CardItemProps) => {
    if (data.title.toLowerCase().includes(keyWord.toLowerCase())) {
      return true
    }
  })
}

const pageSize = () => {
  return  window.innerWidth <= 768 ? 4 : window.innerWidth <= 992 ? 6 : 8 
 }


function App() {
  const [cardData, setCardData] = useState<{
    fetchedData: CardItemProps[];
    filteredData: CardItemProps[];
  }>({
    fetchedData: [],
    filteredData: [],
  });  const [categoriesOptions, setCategoriesOptions] = useState([{label: "All categories", value: "all"}])
  const [filter, setFilter] = useState({
    currentPage: 1,
    pageSize: pageSize(),
    category: "",
    date: "",
    keyWord: "",
    reset: false
  })
  const [requestError , setRequestError] = useState(false)
  const resetFilters = () => {
    setFilter({
      currentPage: 1,
      pageSize: pageSize(),
      category: "",
      date: "",
      keyWord: "",
      reset: true,
    })
  }

 
  useEffect(() => {
    const {category, date, keyWord} = filter
    if (category && (!date || date === "all")) {
      setCardData({...cardData, filteredData: filterByCategory(category, cardData.fetchedData)})
    }
    if (date && category) {
      setCardData({...cardData, filteredData: filterByDate(date, filterByCategory(category, cardData.fetchedData))})
    } else if (date && (!category || category === "all")) {
      setCardData({...cardData, filteredData: filterByDate(date, cardData.fetchedData)})
    }
    if (keyWord  && (!category && !date)) {
      setCardData({...cardData, filteredData: filterByKeyWord(keyWord, cardData.fetchedData)})
    }
    if (keyWord && date) {
      setCardData({...cardData, filteredData: filterByKeyWord(keyWord, filterByDate(date, category ? filterByCategory(category, cardData.fetchedData) : cardData.fetchedData ))})
    }
    if (keyWord && category && !date) {
      setCardData({...cardData, filteredData: filterByKeyWord(keyWord, filterByCategory(category, cardData.fetchedData))})
    }
    if (!category && !date && !keyWord) {
      setCardData({...cardData, filteredData: cardData.fetchedData})
    }
  }, [filter])

  useEffect(() => {
    fetch('https://cms.talkdesk.com/wp-json/web-api/v1/content/cards')
      .then(async response => {
        if (!response.ok) throw new Error('Something went wrong with the request')
        return response.json()
      })
      .then(({data}) => {
        const options = [... new Set(data.list.map(({ label: { text } }: {label: {text: string}}) => text))];
        setCategoriesOptions([categoriesOptions[0] ,...options.map((option) => ({value: option, label: option})) as {label: string, value: string}[]])
        setCardData({fetchedData: data.list, filteredData: data.list}) 
      })
      .catch(error => {
        console.log(error)
        setRequestError(true)
      })
  }, [])

  

  return (
    <$App>
      <$Header>
        <$H1>Read about the most innovative stories at DeskNews</$H1>
      </$Header>
      <$FilterSection>
        <Dropdown filter={filter} setFilter={setFilter} optionsA={categoriesOptions} optionsB={optionsB} />
      </$FilterSection>
      {cardData.fetchedData.length === 0 && !requestError && (
      <$WarningSection>
        <$Warning>Please wait for the request to be finished..</$Warning>
      </$WarningSection>
        )}
      {cardData.fetchedData.length >  0 && cardData.filteredData.length === 0 && !requestError && (
      <$WarningSection>
        <$Warning>There are no results.</$Warning>
        <$Warning>Please, try different search words</$Warning>
        <$ResetButton onClick={resetFilters}>Reset Filters</$ResetButton>
      </$WarningSection>
        )}
      {requestError && (
      <$WarningSection>
        <$Warning>Something went wrong with the request..</$Warning>
      </$WarningSection>)}
      {cardData.filteredData.length > 0 && !requestError && (
      <Grid>
        {cardData.filteredData.map((card: CardItemProps, index) => {
          if (index >= (filter.currentPage - 1) * filter.pageSize && index < filter.currentPage * filter.pageSize) {
              return <Card key={index+card.title} {...card} />
          }
        })}
      </Grid>)}
        <Pagination
          currentPage={filter.currentPage}
          totalCount={cardData.filteredData.length}
          pageSize={pageSize()}
          onPageChange={(page: number) => setFilter({...filter, currentPage: page})}
        />
    </$App>
  );
}

export default App;
