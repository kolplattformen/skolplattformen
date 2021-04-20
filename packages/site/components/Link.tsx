import Link from 'next/link'
import classnames from 'classnames'
import { ReactNode } from 'react'

interface LinkInternalProps {
  children: ReactNode
  href: string
}

const Internal = ({ href, children }: LinkInternalProps): JSX.Element => {
  return (
    <Link href={href}>
      <a className="text-indigo-800">{children}</a>
    </Link>
  )
}

interface LinkExternalProps {
  children: ReactNode
  className?: string
  href: string
  target?: string
}

const External = ({
  className,
  href,
  children,
  target = '_blank',
}: LinkExternalProps): JSX.Element => {
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
