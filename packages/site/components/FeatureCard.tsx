import classnames from 'classnames'

interface FeatureCardProps {
  image: JSX.Element
  title: string
  text: string
  isActive: boolean
}

const FeatureCard = ({ image, title, text, isActive }: FeatureCardProps) => {
  return (
    <div
      className={classnames(
        'px-5 py-12 text-center border-2 border-transparent rounded-lg',
        {
          'border-indigo-600 dark:border-indigo-400': isActive,
        }
      )}
    >
      <div className="w-20 h-20 mx-auto mb-10 text-gray-700 dark:text-gray-400">
        {image}
      </div>
      <div className="font-bold text-lg mb-2">{title}</div>
      <p>{text}</p>
    </div>
  )
}

export default FeatureCard
