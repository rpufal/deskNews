import { CardItemProps } from './components/Card';


export const optionsDate = [{
    label: 'All',
    value: 'all',
  },
  {
    label: 'Last year',
    value: 'lastYear',
  },{
    label: 'This year',
    value: 'thisYear',
  }
  ]

export const optionsIntegrations = [
  { label: 'All Integrations', value: 'all-integrations' },
  { label: 'API', value: 'api' },
  { label: 'Custom CRM', value: 'custom-crm' },
  { label: 'Freshdesk', value: 'freshdesk' },
  { label: 'Help Scout', value: 'help-scout' },
  { label: 'Intercom', value: 'intercom' },
  { label: 'Kustomer CRM', value: 'kustomer-crm' },
  { label: 'Microsoft Dynamics', value: 'microsoft-dynamics' },
  { label: 'Salesforce', value: 'salesforce' },
  { label: 'ServiceNow', value: 'servicenow' },
  { label: 'Slack', value: 'slack' },
  { label: 'Zendesk', value: 'zendesk' }
];

export const  optionsRegions = [
  { label: 'All Regions', value: 'all-regions' },
  { label: 'Americas', value: 'americas' },
  { label: 'EMEA', value: 'emea' }
];

export const optionsIndustry = [
  { label: 'All Industries', value: 'all-industries' },
  { label: 'Business Services', value: 'business-services' },
  { label: 'Communications, Media & Internet', value: 'communications-media-internet' },
  { label: 'Financial Services & Insurance', value: 'financial-services-insurance' },
  { label: 'Government & Education', value: 'government-education' },
  { label: 'Healthcare & Life Sciences', value: 'healthcare-life-sciences' },
  { label: 'Information Technology & Services', value: 'information-technology-services' },
  { label: 'Manufacturing', value: 'manufacturing' },
  { label: 'Retail & Consumer Goods', value: 'retail-consumer-goods' },
  { label: 'Staffing & Employment Services', value: 'staffing-employment-services' },
  { label: 'Transportation & Hospitality', value: 'transportation-hospitality' },
  { label: 'Transportation & Logistics', value: 'transportation-logistics' }
];

  
export const pageSize = () => {
    return  window.innerWidth <= 768 ? 6 : window.innerWidth <= 992 ? 9 : 12 
   }

   export const cropText = (text: string): string => {
    let maxLength = 22;
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text
  }
  
  export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }  