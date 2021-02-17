import Image from 'next/image'
import img1 from '../assets/img/boys.png'
import DownloadButtons from './DownloadButtons'
import Section from './Section'
import { H2 } from './Typography'

const CtaTwo = () => {
  return (
    <Section>
      <Image src={img1} width="668" height="500" alt="" />
      <div>
        <H2>Lika säkert</H2>
        <p>
          Ingen information om dina barn skickas till oss, all kommunikation går
          direkt mellan din telefon och Skolplattformens servrar. Du loggar in
          med BankID som vanligt.
        </p>
        <div className="mt-5">
          <DownloadButtons />
        </div>
      </div>
    </Section>
  )
}

export default CtaTwo
