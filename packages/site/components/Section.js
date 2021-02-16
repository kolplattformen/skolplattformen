import classnames from 'classnames'

const Section = ({
  bg = 'bg-gray-100',
  padding = 'py-8 md:py-20',
  children,
  id,
}) => {
  return (
    <section className={classnames('grid grid grid-main', bg, padding)} id={id}>
      <div className="items-center grid gap-y-5 md:gap-y-20 col-start-3 col-end-4 grid-cols-1 md:grid-cols-2">
        {children}
      </div>
    </section>
  )
}

export default Section
