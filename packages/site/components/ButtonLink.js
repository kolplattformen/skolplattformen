import Link from 'next/link'

const ButtonLink = ({ children, href, target }) => {
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

export const ButtonLinkInternal = ({ children, href }) => {
  return (
    <Link href={href}>
      <a className="inline-block px-4 py-2 font-bold text-indigo-800 border-2 border-indigo-800 rounded-full cursor-pointer md:px-8 md:py-4 hover:bg-indigo-800 hover:text-white">
        {children}
      </a>
    </Link>
  )
}

export default ButtonLink
