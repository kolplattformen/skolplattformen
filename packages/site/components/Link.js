import Link from 'next/link'

const Internal = ({ href, children }) => {
  return (
    <Link href={href}>
      <a className="text-indigo-800">{children}</a>
    </Link>
  )
}

const External = ({ href, children }) => {
  return (
    <a className="text-indigo-800" href={href}>
      {children}
    </a>
  )
}

export default { Internal, External }
