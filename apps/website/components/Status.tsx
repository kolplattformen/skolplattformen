const Status = () => {
  return (
    <div className="max-w-6xl px-5 mx-auto my-5 md:my-24 md:px-0 prose dark:prose-dark">
      <h1>Status</h1>
      <h3>Funkar appen som den ska?</h3>
      <p>
       Appen fungerar!
        <br />
        🟩 iPhone
        <br />
        🟩 Android
      </p>
      <h3>Upptäckt några problem? Hjälp oss att fixa det</h3>
      <p>
        Det finns det tre sätt att göra det (i stigande ordning av braighet):
        <ul>
          <li>Skicka en tweet 🥉</li>
          <li>
            <a href="https://github.com/kolplattformen/skolplattformen/issues">
              Lägg en buggrapport här
            </a>{' '}
            🥈
          </li>
          <li>
            <a href="https://github.com/kolplattformen/skolplattformen/pulls">
              Skicka en PR
            </a>{' '}
            🥇
          </li>
        </ul>
      </p>
    </div>
  )
}

export default Status
