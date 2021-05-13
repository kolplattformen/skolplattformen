import classnames from 'classnames'
import Link from 'next/link'

interface LinkInternalProps {
  href: string
}

const Internal: React.FC<LinkInternalProps> = ({
  href,
  children,
}): JSX.Element => {
  return (
    <Link href={href}>
      <a className="text-indigo-800 dark:text-indigo-500">{children}</a>
    </Link>
  )
}

interface LinkExternalProps {
  className?: string
  href: string
  target?: string
}

const External: React.FC<LinkExternalProps> = ({
  className,
  href,
  children,
  target = '_blank',
}): JSX.Element => {
  return (
    <a
      className={classnames('text-indigo-800 dark:text-indigo-500', className)}
      href={href}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : ''}
    >
      {children}
    </a>
  )
}

export default { Internal, External }
