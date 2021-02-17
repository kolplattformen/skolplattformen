import SectionTitle from './SectionTitle'
import Link from './Link'

const MEDIA_DATA = [
  {
    title: 'Efter skandalerna – kodande föräldrar släpper egen skolapp',
    source: 'Ny Teknik',
    link:
      'https://www.nyteknik.se/premium/efter-skandalerna-kodande-foraldrar-slapper-egen-skolapp-7009234',
    date: '2021-02-05',
  },
  {
    title: 'Stockholms stad utreder föräldrarnas app: ”Kan vara olaglig”',
    source: 'Ny Teknik',
    link:
      'https://www.nyteknik.se/digitalisering/stockholms-stad-utreder-foraldrarnas-app-kan-vara-olaglig-7009287',
    date: '2021-02-05',
  },
  {
    title: 'Lärare dömer ut Skolplattformen',
    source: 'Dagens Nyheter',
    link: 'https://www.dn.se/sthlm/larare-domer-ut-skolplattformen/',
    date: '2021-02-05',
  },
  {
    title: 'Han utmanar Skolplattformen med egen app: ”Något behövde göras”',
    source: 'SVT Nyheter',
    link:
      'https://www.svt.se/nyheter/lokalt/stockholm/han-trottnade-pa-skolplattformen-byggde-en-egen-app',
    date: '2021-02-06',
  },
]

const Media = () => {
  return (
    <section className="max-w-6xl px-5 py-8 mx-auto md:px-0 md:py-32">
      <SectionTitle title="Öppna Skolplattformen i media" />
      <ul className="flex flex-col items-center max-w-xl mx-auto space-y-5">
        {MEDIA_DATA.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        ).map((article) => (
          <li className="w-full" key={article.title}>
            <Link.External href={article.link} target="_blank">
              {article.title}
            </Link.External>
            <div className="mt-2 text-sm font-bold text-gray-700">
              {article.source}
              <span className="ml-2 text-xs font-normal text-gray-600">
                {article.date}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Media
