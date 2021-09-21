import React, { ReactNode } from 'react'

interface SectionTitleProps {
  text?: ReactNode
  title: ReactNode
}

const SectionTitle = ({ text, title }: SectionTitleProps) => {
  return (
    <div className="mb-16 text-center space-y-5">
      <h2 className="text-4xl md:text-5xl font-bold leading-tight text-gray-800 dark:text-white">
        {title}
      </h2>
      {text && <p className="text-gray-600 dark:text-gray-400">{text}</p>}
    </div>
  )
}

export default SectionTitle
