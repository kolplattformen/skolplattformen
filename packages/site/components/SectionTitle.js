const SectionTitle = (props) => {
  return (
    <div className="text-center mb-16">
      <h2 className="mb-5 text-5xl font-bold text-gray-800">{props.title}</h2>
      <p className="text-gray-600">{props.text}</p>
    </div>
  )
}

export default SectionTitle
