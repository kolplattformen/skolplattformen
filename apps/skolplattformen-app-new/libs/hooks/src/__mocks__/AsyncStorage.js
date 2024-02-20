const pause = (ms = 0) => new Promise((r) => setTimeout(r, ms))

export default (init = {}, delay = 0) => {
  const cache = {}
  Object.keys(init).forEach((key) => {
    cache[key] = JSON.stringify(init[key])
  })
  const getItem = async (key) => {
    await pause(delay)
    return cache[key] || null
  }
  const setItem = async (key, val) => {
    await pause(delay)
    cache[key] = val
  }
  const clear = () => {
    Object.keys(cache).forEach((key) => {
      cache[key] = undefined
    })
  }
  return {
    getItem,
    setItem,
    cache,
    clear,
  }
}
