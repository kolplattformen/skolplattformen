import classNames from 'classnames'
import Link from 'next/link'
import { AnchorHTMLAttributes, DetailedHTMLProps } from 'react'

type ButtonLinkProps = DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>

const ButtonLink: React.FC<ButtonLinkProps> = ({
  children,
  className,
  href,
  target,
}) => {
  const isExternal = href?.indexOf('//') !== -1

  const inner = (
    <a
      href={isExternal ? href : undefined}
      className={classNames(
        'inline-block py-2 px-4 md:px-8 md:py-4 font-bold text-indigo-800 border-2 border-indigo-800 rounded-full hover:bg-indigo-800 dark:hover:bg-indigo-400 hover:text-white dark:text-indigo-400 dark:border-indigo-400',
        className
      )}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : ''}
    >
      {children}
    </a>
  )

  if (isExternal || !href) {
    return inner
  }

  return (
    <Link href={href} passHref>
      {inner}
    </Link>
  )
}

export const ButtonLinkPatreon: React.FC = ({ children }) => {
  return (
    <ButtonLink
      href="https://www.patreon.com/oppnaskolplattformen"
      className="!text-white bg-red-500 !border-transparent rounded-full hover:!bg-transparent hover:!border-red-500 hover:!text-red-500"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </ButtonLink>
  )
}

export default ButtonLink
