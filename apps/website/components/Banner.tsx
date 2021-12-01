import Image from 'next/image'
import appstore from '../assets/img/appstore.svg'
import phone from '../assets/img/banner/phone_login.png'
import shape1 from '../assets/img/banner/shape1.png'
import shape2 from '../assets/img/banner/shape2.png'
import shape3 from '../assets/img/banner/shape3.png'
import shape4 from '../assets/img/banner/shape4.png'
import shape5 from '../assets/img/banner/shape5.png'
import shape6 from '../assets/img/banner/shape6.png'
import shape7 from '../assets/img/banner/shape7.png'
import playstore from '../assets/img/playstore.png'
import Link from './Link'
import { H1 } from './Typography'
import { useIntl } from 'react-intl'
import ButtonLink, { ButtonLinkPatreon } from './ButtonLink'

const Banner = () => {
  const intl = useIntl()

  return (
    <div className="header">
      <div className="relative max-w-6xl mx-auto mt-5 mb-20 lg:pt-32 lg:mb-52">
        <div className="px-5 grid grid-cols-1 lg:grid-cols-2 lg:px-0 xl:gap-12 lg:gap-1 gap-12   ">
          <div className="pl-0 md:pl-4 xl:pl-0">
            <div className="hidden select-none lg:block">
              <div>
                <img
                  src={shape1}
                  alt=""
                  className="absolute left-64 top-8 motion-safe:animate-pulse"
                />
                <img
                  src={shape2}
                  alt=""
                  className="absolute left-9 top-20 motion-safe:animate-pulse"
                />
                <img
                  src={shape3}
                  alt=""
                  className="absolute left-48 top-18 motion-safe:animate-pulse"
                />
                <img
                  src={shape4}
                  alt=""
                  className="absolute top-20 right-20 motion-safe:animate-bounce-slow"
                />
                <img
                  src={shape5}
                  alt=""
                  className="absolute top-1/2 left-1/2 motion-safe:animate-pulse"
                />
                <img
                  src={shape6}
                  alt=""
                  className="absolute left-96 top-32 motion-safe:animate-bounce-slow"
                />
                <img
                  src={shape7}
                  alt=""
                  className="absolute bottom-48 right-8 motion-safe:animate-bounce-slow"
                />
              </div>
            </div>
            <H1>{intl.formatMessage({ id: 'general.title' })}</H1>
            <p>{intl.formatMessage({ id: 'general.description' })}</p>
            {/*intl.formatMessage({ id: 'general.flashtitle' }) && (
              <div className="mt-5">
                <h2 className="mb-4 text-2xl font-bold leading-tight text-gray-800 dark:text-white md:text-4xl">
                  {intl.formatMessage({ id: 'general.flashtitle' })}
                </h2>
                <p>{intl.formatMessage({ id: 'general.flashtext' })}</p>
              </div>
            )*/}
            <p className="flex items-center py-4 sm:flex-row space-x-2 lg:space-x-4">
              <Link.External
                className="inline-block"
                href="https://apps.apple.com/se/app/%C3%B6ppna-skolplattformen-app/id1543853468"
                target="_blank"
              >
                <img
                  alt="Ladda ner i App Store"
                  src={appstore}
                  className="w-auto h-12"
                />
              </Link.External>
              <Link.External
                className="inline-block"
                href="https://play.google.com/store/apps/details?id=org.skolplattformen.app"
                target="_blank"
              >
                <img
                  alt="Ladda ner i Google Play Store"
                  src={playstore}
                  className="h-12"
                />
              </Link.External>
            </p>
            <p className="flex items-center py-4 sm:flex-row space-x-2 lg:space-x-4">
              <ButtonLinkPatreon>
                {intl.formatMessage({ id: 'navigation.patreon' })}
              </ButtonLinkPatreon>
            </p>
            <p className="flex flex-col mt-5 sm:items-center sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <ButtonLink href="/integritet">
                {intl.formatMessage({ id: 'navigation.integrity' })}
              </ButtonLink>

              <ButtonLink href="/qa">
                {intl.formatMessage({ id: 'navigation.qna' })}
              </ButtonLink>
            </p>
          </div>
          <div className="flex items-start justify-center pr-0 motion-safe:animate-bounce-slow md:pr-4 xl:pr-0">
            <Image src={phone} width="350" height="712" alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner
