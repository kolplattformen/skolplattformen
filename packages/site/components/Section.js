import classnames from 'classnames'

const Section = ({ bg = 'bg-gray-100', children }) => {
  return (
    <section className={classnames('grid py-8 md:py-20 grid grid-main', bg)}>
      <div className="items-center grid col-start-3 col-end-4 grid-cols-1 md:grid-cols-2">
        {children}
      </div>
    </section>
  )
}

export default Section
