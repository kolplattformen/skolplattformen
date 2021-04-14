const Status = () => {
    return (
        <div className="max-w-6xl px-5 mx-auto my-5 md:my-24 md:px-0 prose">
            <h1>Status</h1>
            <h3>Funkar appen som den ska?</h3>
            <p>
                Senast vi kollade!
                <br />
                ✅ iPhone
                <br />
                ✅ Android
            </p>
            <p>
                Vi har inga rapporter om att appen har problem för tillfället.
                Har du upptäckt problem nu? Hjälp oss fixa det! 
            </p>
            <p>
                Det finns det tre sätt att göra det (i stigande ordning av braighet):
                <ul>
                    <li>Skicka en tweet 🥉</li>
                    <li><a href="https://github.com/kolplattformen/skolplattformen/issues">Lägg en buggrapport här</a> 🥈</li>
                    <li><a href="https://github.com/kolplattformen/skolplattformen/pulls">Skicka en PR</a> 🥇</li>
                </ul>
            </p>
        </div>
    )
  }
  
  export default Status
  