const ButtonLink = ({ children, href }) => {
  return (
    <a
      href={href}
      className="inline-block px-8 py-4 font-bold border-2 border-indigo-800 rounded-full text-indigo-800 hover:bg-indigo-800 hover:text-white"
    >
      {children}
    </a>
  )
}

export default ButtonLink
