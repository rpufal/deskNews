import { $Card, $Image ,$Title, $Label, $TextContainer, $Author} from './styles'
import { cropText, formatDate } from '../../utils'

export interface CardItemProps {
  image:{
    alt: string,
    src: string,
  },
  label: {
    text: string,
  },
  title: string,
  author: {
    name: string,
  },
  datetime: string,
}




const Card = (props: CardItemProps) => {
  const { image, label, title, author, datetime } = props
  return (
    <$Card>
      <$Image {...image} />
        <$TextContainer>
          <$Label  >
            {label.text}
          </$Label>
          <$Title >
            {cropText(title)}
          </$Title>
          <$Author>{datetime ? formatDate(datetime) : "Unknown"}</$Author>
        </$TextContainer>
    </$Card >
  )
}

export default Card
