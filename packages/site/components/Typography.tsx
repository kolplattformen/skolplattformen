import { ReactNode } from 'react'

interface H1Props {
  children: ReactNode
}

export const H1 = ({ children }: H1Props) => {
  return (
    <h1 className="mb-5 text-4xl md:text-5xl font-semibold text-gray-800">
      {children}
    </h1>
  )
}

interface H2Props {
  children: ReactNode
}

export const H2 = ({ children }: H2Props) => {
  return (
    <h2 className="mb-5 text-5xl font-semibold text-gray-800">{children}</h2>
  )
}
