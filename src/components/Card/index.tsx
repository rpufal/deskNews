import { $Card, $Image ,$Title, $Label, $TextContainer, $Author} from './styles'

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
  date: string,
}

const cropText = (text: string) => {
  let maxLength: number;
  window.innerWidth < 768 ? (maxLength = 45) : window.innerWidth < 992 ? (maxLength = 25) : (maxLength = 21)
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text
}

const Card = (props: CardItemProps) => {
  const { image, label, title, author, date } = props
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
          <$Author>{author.name} - {date}</$Author>
        </$TextContainer>
    </$Card >
  )
}

export default Card
