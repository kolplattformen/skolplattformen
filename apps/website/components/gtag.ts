export const GA_TRACKING_ID = 'G-KX6E6T6FXS'

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string): void => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url.replace('#', ''),
  })
}

interface GoogleEvent {
  action: string
  category: string
  label: string
  value: string
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({
  action,
  category,
  label,
  value,
}: GoogleEvent): void => {
  window.gtag('event', action, {
    value,
    event_category: category,
    event_label: label,
  })
}
