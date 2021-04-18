module.exports = {
  siteUrl: 'https://skolplattformen.org',
  generateRobotsTxt: true,
  transform: async (config, path) => {
    console.log(path)
    dailypages = ['/aktuellt', '/status', '/qa']
    changefreq = dailypages.includes(path) ? 'daily' : 'weekly'
    priority = config.priority
    if (path == '/') {
      priority = 1.0
    } else if (path == '/aktuellt') {
      priority = 0.9
    } else if (path == '/qa') {
      priority = 0.8
    }
    return {
      loc: path,
      changefreq: changefreq,
      priority: priority,
      lastmod: config.lastmod
    }
  }
}
