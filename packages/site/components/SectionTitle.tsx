import { H2 } from '../components/Typography'

interface SectionTitleProps {
  text?: string
  title: string
}

const SectionTitle = ({ text, title }: SectionTitleProps): JSX.Element => {
  return (
    <div className="mb-16 text-center space-y-5">
      <H2>{title}</H2>
      {text && <p className="text-gray-600">{text}</p>}
    </div>
  )
}

export default SectionTitle
