type Heading = {
  children: string
}

export const H1 = ({ children }: Heading) => {
  return (
    <h1 className="mb-5 text-4xl md:text-5xl font-semibold text-gray-800 dark:text-white">
      {children}
    </h1>
  )
}

export const H2 = ({ children }: Heading) => {
  return (
    <h2 className="mb-5 text-5xl font-semibold text-gray-800 dark:text-white">
      {children}
    </h2>
  )
}
