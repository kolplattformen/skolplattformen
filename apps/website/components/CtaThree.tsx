import Image from 'next/image'
import img2 from '../assets/img/girls.png'
import DownloadButtons from './DownloadButtons'
import Section from './Section'
import { H2 } from './Typography'

const CtaThree = () => {
  return (
    <Section bg="bg-white dark:bg-gray-900">
      <div>
        <H2>Se summering för alla dina barn på ett ställe</H2>
        <p>
          Vi har räknat, det tar flera minuter att få en uppfattning om vad som
          händer i skolan imorgon för dina barn. I vår app kan du direkt se allt
          som är aktuellt för alla barnen på en och samma skärm.
        </p>
        <div className="mt-5">
          <DownloadButtons />
        </div>
      </div>

      <Image src={img2} alt="" width="668" height="500" />
    </Section>
  )
}

export default CtaThree
