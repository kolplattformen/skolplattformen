import classnames from 'classnames'

interface SectionProps {
  bg?: string
  id?: string
  padding?: string
}

const Section: React.FC<SectionProps> = ({
  bg = 'bg-gray-100 dark:bg-gray-800',
  padding = 'py-8 md:py-20',
  children,
  id,
}) => {
  return (
    <section className={classnames('grid grid-main', bg, padding)} id={id}>
      <div className="items-center grid gap-y-5 md:gap-y-20 col-start-3 col-end-4 grid-cols-1 lg:grid-cols-2">
        {children}
      </div>
    </section>
  )
}

export default Section
