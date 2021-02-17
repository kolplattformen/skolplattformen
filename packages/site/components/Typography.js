export const H1 = ({ children }) => {
  return (
    <h1 className="mb-5 text-4xl md:text-5xl font-semibold text-gray-800">
      {children}
    </h1>
  )
}

export const H2 = ({ children }) => {
  return (
    <h2 className="mb-5 text-5xl font-semibold text-gray-800">{children}</h2>
  )
}
