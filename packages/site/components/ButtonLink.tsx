import Link from 'next/link'
import React from 'react'

type ButtonLinkProps = Pick<HTMLAnchorElement, 'href' | 'target'>

const ButtonLink: React.FC<ButtonLinkProps> = ({ children, href, target }) => {
  return (
    <a
      href={href}
      className="inline-block py-2 px-4 md:px-8 md:py-4 font-bold text-indigo-800 border-2 border-indigo-800 rounded-full hover:bg-indigo-800 hover:text-white"
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : ''}
    >
      {children}
    </a>
  )
}

type ButtonLinkInternalProps = Pick<HTMLAnchorElement, 'href'>

export const ButtonLinkInternal: React.FC<ButtonLinkInternalProps> = ({
  children,
  href,
}) => {
  return (
    <Link href={href}>
      <a className="inline-block px-4 py-2 font-bold text-indigo-800 border-2 border-indigo-800 rounded-full cursor-pointer md:px-8 md:py-4 hover:bg-indigo-800 hover:text-white">
        {children}
      </a>
    </Link>
  )
}

export const ButtonLinkPatreon: React.FC = ({ children }) => {
  return (
    <a
      href="https://www.patreon.com/oppnaskolplattformen"
      className="inline-block px-4 py-2 font-bold text-white bg-red-500 border-2 rounded-full md:px-8 md:py-4 hover:bg-white hover:border-red-500 hover:text-red-500"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  )
}

export default ButtonLink
