import ButtonLink, { ButtonLinkPatreon } from './ButtonLink'

const DownloadButtons = () => {
  return (
    <div className="space-x-4">
      <ButtonLink
        href="https://apps.apple.com/se/app/%C3%B6ppna-skolplattformen-app/id1543853468"
        target="_blank"
      >
        App Store
      </ButtonLink>
      &nbsp;
      <ButtonLink
        href="https://play.google.com/store/apps/details?id=org.skolplattformen.app"
        target="_blank"
      >
        Play Store
      </ButtonLink>
      <ButtonLinkPatreon>Stöd oss på Patreon!</ButtonLinkPatreon>
    </div>
  )
}

export default DownloadButtons
