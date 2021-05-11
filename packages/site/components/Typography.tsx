export const H1: React.FC = ({ children }) => {
  return (
    <h1 className="mb-5 text-4xl md:text-5xl font-semibold text-gray-800 dark:text-gray-300">
      {children}
    </h1>
  )
}

export const H2: React.FC = ({ children }) => {
  return (
    <h2 className="mb-5 text-3xl font-semibold text-gray-800 dark:text-gray-300">
      {children}
    </h2>
  )
}
