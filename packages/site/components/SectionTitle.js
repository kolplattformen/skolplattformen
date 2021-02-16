const SectionTitle = (props) => {
  return (
    <div className="mb-16 text-center">
      <h2 className="mb-5 text-5xl font-bold leading-tight text-gray-800">
        {props.title}
      </h2>
      <p className="text-gray-600">{props.text}</p>
    </div>
  )
}

export default SectionTitle
