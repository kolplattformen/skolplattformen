import classnames from 'classnames'

const FeatureCard = ({ image, title, text, isActive }) => {
  return (
    <div
      className={classnames(
        'px-2 py-16 text-center border-2 border-transparent rounded-lg',
        {
          'border-indigo-600': isActive,
        }
      )}
    >
      <div className="feature-icon">
        <img src={image} className="svg" alt="" />
      </div>
      <h5>{title}</h5>
      <p>{text}</p>
    </div>
  )
}

export default FeatureCard
