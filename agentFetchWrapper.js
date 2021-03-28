module.exports = function agentDecorator (fetch, agent) {
    fetch = fetch || window.fetch
  
    async function fetchWrapper (url, opts) {
      opts = opts || {}
  
      // Prepare request
      opts.agent = agent
  
      // Actual request
      const res = await fetch(url, opts)
  
      return res
    }
  
    return fetchWrapper
  }