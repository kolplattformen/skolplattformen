import Link from 'next/link'
import classnames from 'classnames'

const Internal = ({ href, children }) => {
  return (
    <Link href={href}>
      <a className="text-indigo-800">{children}</a>
    </Link>
  )
}

const External = ({ className, href, children, target = '_blank' }) => {
  return (
    <a
      className={classnames('text-indigo-800', className)}
      href={href}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : ''}
    >
      {children}
    </a>
  )
}

export default { Internal, External }
