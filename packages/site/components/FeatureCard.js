import classnames from 'classnames'

const FeatureCard = ({ image, title, text, isActive }) => {
  return (
    <div
      className={classnames(
        'px-5 py-12 text-center border-2 border-transparent rounded-lg',
        {
          'border-indigo-600': isActive,
        }
      )}
    >
      <div className="w-20 h-20 mx-auto mb-10">
        <img src={image} className="svg" alt="" />
      </div>
      <h5 className="font-bold text-lg mb-2">{title}</h5>
      <p>{text}</p>
    </div>
  )
}

export default FeatureCard
