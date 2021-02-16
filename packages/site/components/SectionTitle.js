const SectionTitle = ({ text, title }) => {
  return (
    <div className="mb-16 text-center space-y-5">
      <h2 className="text-4xl md:text-5xl font-bold leading-tight text-gray-800">
        {title}
      </h2>
      {text && <p className="text-gray-600">{text}</p>}
    </div>
  )
}

export default SectionTitle
