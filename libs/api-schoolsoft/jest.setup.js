// node-html-parser 9.x förutsätter atob/btoa (jest-environment-node 27 exponerar dem ej)
if (typeof global.atob !== 'function') {
  global.atob = (s) => Buffer.from(s, 'base64').toString('binary')
}
if (typeof global.btoa !== 'function') {
  global.btoa = (s) => Buffer.from(s, 'binary').toString('base64')
}
