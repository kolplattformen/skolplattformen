const baseUrl = 'https://api.skolplattformen.org'

export const getChildren = (jwt) => {
  return fetch(`${baseUrl}/children/`, {headers}).then(res => res.json()).then(children => {
    // TODO: performance
    return Promise.all((children || [] ).map(async child => ({
      ...child,
      classmates: await fetch(`${baseUrl}/children/${child.sdsId}/classmates`, {headers}).then(res => res.json()),
      news: await fetch(`${baseUrl}/children/${child.id}/news`, {headers}).then(res => res.json()),
      calendar: await fetch(`${baseUrl}/children/${child.id}/calendar`, {headers}).then(res => res.json()),
      schedule: await fetch(`${baseUrl}/children/${child.sdsId}/schedule`, {headers}).then(res => res.json()),
      menu: await fetch(`${baseUrl}/children/${child.id}/menu`, {headers}).then(res => res.json()),
      notifications: await fetch(`${baseUrl}/children/${child.sdsId}/notifications`, {headers}).then(res => res.json())
    })))
  })
}
