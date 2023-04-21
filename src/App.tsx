import { useState, useEffect } from 'react';
import { Card, Grid, Pagination, Dropdown } from './components';
import { CardItemProps } from './components/Card';
import { $Warning, $FilterSection,
  $WarningSection, $ResetButton, $App, $Header, $H1 } from './styles';
import {optionsRegions, pageSize, optionsIndustry, optionsIntegrations } from './utils';


function App() {
  const [cardData, setCardData] = useState<{
    fetchedData: CardItemProps[];
    filteredData: CardItemProps[];
    fetching: boolean
  }>({
    fetchedData: [],
    filteredData: [],
    fetching: false,
  });  
  const [filter, setFilter] = useState({
    currentPage: 1,
    pageSize: pageSize(),
    industry: "",
    date: "",
    keyWord: "",
    integration: "",
    region: "",
    reset: false
  })
  const [requestError , setRequestError] = useState(false)
  const resetFilters = () => {
    setFilter({
      currentPage: 1,
      pageSize: pageSize(),
      industry: "",
      date: "",
      keyWord: "",
      integration: "",
      region: "",
      reset: true,
    })
  }
  const handleApiCall = (body:BodyInit ) => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: body,
      redirect: 'follow' as RequestRedirect,
    };
    fetch('https://cms.talkdesk.com/wp-json/web-api/v1/content/cards', requestOptions)
        .then(async response => {
          if (!response.ok) throw new Error('Something went wrong with the request')
          return response.json()
        })
        .then(({data}) => {
          setCardData({fetchedData: data.list, filteredData: data.list, fetching: false}) 
        })
        .catch(error => {
          console.log(error)
          setCardData({...cardData, fetching: false})
          setRequestError(true)
        })
  }
 
  useEffect(() => {
    const {industry, integration, region, keyWord} = filter
    const updatedBody = JSON.stringify({
      category: [],
      integration: integration,
      limit: 40,
      order: 'ASC',
      order_by: 'title',
      page: 1,
      post_type: ["customers"],
      search: keyWord,
      industry: industry,
      region: region
    });
    setCardData({...cardData, fetching: true})
    handleApiCall(updatedBody)
  }, [filter])

  

  

  return (
    <$App>
      <$Header>
        <$H1>Read about the most innovative stories at DeskNews</$H1>
      </$Header>
      <$FilterSection>
        <Dropdown filter={filter} setFilter={setFilter} optionsIntegrations={optionsIntegrations} optionsIndustry={optionsIndustry} optionsRegions={optionsRegions} />
      </$FilterSection>
      {cardData.fetching && !requestError && (
      <$WarningSection>
        <$Warning>Please wait for the request to be finished..</$Warning>
      </$WarningSection>
        )}
      {cardData.fetchedData.length ===  0 && !cardData.fetching && !requestError && (
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
      {cardData.filteredData.length > 0 && !cardData.fetching && !requestError && (
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
