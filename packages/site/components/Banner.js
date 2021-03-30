import Image from 'next/image'
import NextLink from 'next/link'
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

const Banner = () => {

  const intl = useIntl()
  
  return (
    <div className="header">
      <div className="relative max-w-6xl mx-auto mt-5 mb-20 md:pt-32 md:mb-52">
        <div className="px-5 grid grid-cols-1 md:grid-cols-2 md:px-0 gap-12">
          <div>
            <div className="hidden select-none md:block">
              <div>
                <img
                  src={shape1}
                  alt=""
                  className="absolute left-64 top-8 motion-safe:animate-pulse"
                />
                <img
                  src={shape2}
                  alt=""
                  className="absolute left-9 top-20 -z-1 motion-safe:animate-pulse"
                />
                <img
                  src={shape3}
                  alt=""
                  className="absolute -bottom-2 left-8 motion-safe:animate-pulse"
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
                  className="absolute bottom-48 right-8 -z-1 motion-safe:animate-bounce-slow"
                />
              </div>
            </div>
            <H1>{intl.formatMessage({ id: 'general.title'})}</H1>
            <p>
              {intl.formatMessage({ id: 'general.description'})}
            </p>
            <p className="py-4 flex items-center sm:flex-row space-x-2 md:space-x-4">
              <Link.External
                className="inline-block"
                href="https://apps.apple.com/se/app/%C3%B6ppna-skolplattformen/id1543853468"
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
            <p className="flex flex-col sm:items-center mt-5 sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <NextLink href="/integritet">
                <a className="inline-block px-4 py-2 font-bold text-indigo-800 border-2 border-indigo-800 rounded-full md:px-8 md:py-4 hover:bg-indigo-800 hover:text-white">
                  Integritetspolicy
                </a>
              </NextLink>

              <NextLink href="/qa">
                <a className="inline-block px-4 py-2 font-bold text-indigo-800 border-2 border-indigo-800 rounded-full md:px-8 md:py-4 hover:bg-indigo-800 hover:text-white">
                  Frågor och svar
                </a>
              </NextLink>
            </p>
          </div>
          <div className="flex justify-center motion-safe:animate-bounce-slow">
            <Image src={phone} width="350" height="712" alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner
