import classnames from 'classnames'
import Link from 'next/link'

interface LinkInternalProps {
  href: string
}

const Internal: React.FC<LinkInternalProps> = ({ href, children }) => {
  return (
    <Link
      legacyBehavior
      href={href}
      className="text-indigo-800 dark:text-indigo-400"
    >
      {children}
    </Link>
  )
}

interface LinkExternalProps {
  className?: string
  href: string
  target?: string
  children?: React.ReactNode | React.ReactNode[]
}

const External: React.FC<LinkExternalProps> = ({
  className,
  href,
  children,
  target = '_blank',
}) => {
  return (
    <a
      className={classnames('text-indigo-800 dark:text-indigo-400', className)}
      href={href}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : ''}
    >
      {children}
    </a>
  )
}

export default { Internal, External }
