// kördes FÖRE testramverket laddar moduler: expo-winter kräver FormData
if (typeof global.FormData === 'undefined') {
  global.FormData = class FormData {
    append() {}
    delete() {}
    get() {
      return null
    }
    getAll() {
      return []
    }
    has() {
      return false
    }
    set() {}
    entries() {
      return [][Symbol.iterator]()
    }
    keys() {
      return [][Symbol.iterator]()
    }
    values() {
      return [][Symbol.iterator]()
    }
    [Symbol.iterator]() {
      return [][Symbol.iterator]()
    }
    forEach(_cb) {}
  }
}
if (typeof global.atob === 'undefined') {
  global.atob = (s) => Buffer.from(s, 'base64').toString('binary')
}
