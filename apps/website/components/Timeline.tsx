import { TimelineEvent } from '../pages/aktuellt'
import Link from './Link'

const dateFormat = (date: string) => {
  const parsedDate = new Date(date)

  return Intl
    ? new Intl.DateTimeFormat('sv-SE', {
        month: 'long',
        year: 'numeric',
      }).format(parsedDate)
    : `${parsedDate.getFullYear()}-${parsedDate.getMonth()}`
}

interface TimelineProps {
  events: TimelineEvent[]
}

const Timeline = ({ events }: TimelineProps) => {
  return (
    <ul className="max-w-2xl border-gray-200 dark:border-gray-900 md:mx-auto md:border-l-2 space-y-4 md:space-y-12">
      {events
        .sort((a, b) => b.date.localeCompare(a.date))
        .map(({ date, media, importantDates, overview }) => (
          <li className="relative" key={date}>
            <div className="absolute top-0 items-center justify-center hidden w-10 h-10 text-white bg-indigo-400 border-4 border-white rounded-full md:flex -left-5 -top-2">
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="hidden mb-4 ml-8 text-sm font-bold text-gray-700 dark:text-gray-400 capitalize md:block">
              {dateFormat(date)}
            </div>
            <div className="p-4 text-sm leading-relaxed bg-white border-t-4 border-indigo-300 rounded-b shadow-md dark:bg-gray-800 md:p-5 md:ml-8">
              <div className="block mb-4 text-lg font-bold text-gray-700 capitalize md:hidden">
                {dateFormat(date)}
              </div>
              {overview}
              {importantDates.length > 0 && (
                <div className="mt-4 text-sm">
                  <div className="font-bold">Viktiga händelser</div>
                  <ul className="pl-5 mt-2 list-disc space-y-2">
                    {importantDates
                      .sort((a, b) => b.date.localeCompare(a.date))
                      .map((important, i) => (
                        <li key={`${important.description}-${i}`}>
                          {important.link ? (
                            <Link.External href={important.link}>
                              {important.description}
                            </Link.External>
                          ) : (
                            important.description
                          )}
                          <div className="text-xs text-gray-500">
                            {important.date}
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              )}
              {media.length > 0 && (
                <div className="mt-4 text-sm">
                  <div className="font-bold">Media</div>
                  <ul className="pl-5 mt-2 list-disc space-y-2">
                    {media
                      .sort((a, b) => b.date.localeCompare(a.date))
                      .map((m) => (
                        <li key={m.description}>
                          {m.link ? (
                            <Link.External href={m.link}>
                              {m.description}
                            </Link.External>
                          ) : (
                            m.description
                          )}
                          <div className="text-xs text-gray-500">{m.date}</div>
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          </li>
        ))}
    </ul>
  )
}

export default Timeline
