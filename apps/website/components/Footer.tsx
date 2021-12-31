import Icon from './Icon'
import Link from './Link'

const team = [
  { name: 'Christian Landgren', twitter: 'landgren' },
  { name: 'Erik Hellman', twitter: 'erikhellman' },
  { name: 'Johan Öbrink', twitter: 'johanobrink' },
  { name: 'Viktor Sarström', twitter: 'viktorsarstrom' },
  { name: 'Kajetan Kazimierczak', twitter: 'kajetanek' },
  { name: 'Jonathan Edenström', twitter: 'edenstroem' },
  { name: 'Andreas Eriksson', twitter: 'whyer77' },
  { name: 'Öppna skolplattformen', twitter: 'oppnaskolplatt' },
]

const Footer = () => {
  return (
    <footer>
      <div className="items-start max-w-6xl px-5 py-8 mx-auto lg:py-12 grid lg:px-4 grid-cols-1 lg:grid-cols-4 gap-x-12 gap-y-5">
        <div>
          <p className="mb-5">
            Skolplattformen utvecklas av föräldrar för föräldrar. Vill du hjälpa
            till? Kom till vår{' '}
            <Link.External href="https://github.com/kolplattformen">
              Github
            </Link.External>
            , där finns all källkod och även uppgifter att ta tag i, vi behöver
            hjälp med allt från illustrationer, UX, design och programmering. Vi
            har även en Discord där vi hjälps åt.
          </p>
          <Link.External href="mailto:info@skolplattformen.org">
            info@skolplattformen.org
          </Link.External>
        </div>

        <div>
          <div className="mb-4 text-xl font-semibold">Vilka är vi?</div>
          <ul className="space-y-2">
            {team.map(({ name, twitter }) => (
              <li className="flex items-center space-x-2" key={name}>
                <div className="w-5 text-gray-700 dark:text-gray-500">
                  <Icon.Twitter />
                </div>
                <Link.External href={`https://twitter.com/@${twitter}`}>
                  {name}
                </Link.External>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="mb-4 text-xl font-semibold">Länkar</div>
          <ul className="space-y-2">
            <li>
              <Link.Internal href="/integritet">
                Integritetspolicy
              </Link.Internal>
            </li>
            <li>
              <Link.Internal href="/qa">Frågor och svar</Link.Internal>
            </li>
          </ul>
        </div>

        <div className="p-5 bg-white dark:bg-gray-800 shadow-md rounded-md">
          <div className="mb-3 text-gray-800 dark:text-gray-200">
            @iteam1337 We move fast and fix things.
          </div>
          <div>
            <Link.External href="https://iteam.se" target="_blank">
              Iteam
            </Link.External>
            <div className="text-sm text-gray-500">En sponsor</div>
          </div>
        </div>
      </div>

      <div className="py-8 text-center text-gray-500">
        <p>© copyright 2021 by Not free beer AB</p>
      </div>
    </footer>
  )
}

export default Footer
