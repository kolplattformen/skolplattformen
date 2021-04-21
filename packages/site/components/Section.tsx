import classnames from 'classnames'
import { ReactNode } from 'react'

interface SectionProps {
  bg?: string
  children: ReactNode
  id?: string
  padding?: string
}

const Section = ({
  bg = 'bg-gray-100',
  padding = 'py-8 md:py-20',
  children,
  id,
}: SectionProps) => {
  return (
    <section className={classnames('grid grid-main', bg, padding)} id={id}>
      <div className="items-center grid gap-y-5 md:gap-y-20 col-start-3 col-end-4 grid-cols-1 lg:grid-cols-2">
        {children}
      </div>
    </section>
  )
}

export default Section
