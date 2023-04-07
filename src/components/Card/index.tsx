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
  let maxLength = 22;
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
