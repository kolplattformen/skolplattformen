const Status = () => {
    return (
        <div className="max-w-6xl px-5 mx-auto my-5 md:my-24 md:px-0 prose">
            <h1>Status</h1>
            <h3>Funkar appen som den ska?</h3>
            <p>
                Ja! 
            </p>
            <p>
                Vi har inga rapporter om att appen har problem för tillfället.
                Har du upptäckt problem nu? Hjälp oss fixa det! 
            </p>
            <p>
                Det finns det tre sätt att göra det (i stigande ordning av braighet):
                <ul className="list-none" >
                    <li>Skicka en tweet 🥉</li>
                    <li>Lägg en buggrapport <a href="https://github.com/kolplattformen/skolplattformen/issues">här</a> 🥈</li>
                    <li>Skicka en <a href="https://github.com/kolplattformen/skolplattformen/pulls">PR</a> 🥇</li>
                </ul>
            </p>
        </div>
    )
  }
  
  export default Status
  