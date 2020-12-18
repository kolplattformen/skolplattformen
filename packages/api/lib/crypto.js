const {
  createCipheriv,
  createDecipheriv,
  createHash,
  randomBytes
} = require('crypto')

const encryptionKey = process.env.JWT_ENCRYPTION_KEY || 'encrypt'
const ALGORITHM = 'aes-256-gcm'

const toBase64Url = (b64) => b64.replace(/\=/g, '').replace(/\+/g, '-').replace(/\\/g, '_')
const fromBase64Url = (b64u) => b64u.replace(/\-/g, '+').replace(/_/g, '\\')

const cipherKey = () => createHash('sha256').update(encryptionKey).digest()

const encrypt = (text) => {
  const iv = randomBytes(16)
  const key = cipherKey()
  const cipherBuffer = Buffer.from(text, 'utf8')
  const cipherIv = createCipheriv(ALGORITHM, key, iv)
  const [buf1, buf2] = [cipherIv.update(cipherBuffer), cipherIv.final()]
  const auth = cipherIv.getAuthTag()
  const base64 = Buffer
    .concat(
      [iv, auth, buf1, buf2],
      32 + buf1.length + buf2.length
    )
    .toString('base64')
  return toBase64Url(base64)
}

const decrypt = (encrypted) => {
  const buffer = Buffer.from(fromBase64Url(encrypted), 'base64')
  const iv = buffer.slice(0, 16)
  const auth = buffer.slice(16, 32)
  const cipher = buffer.slice(32)
  const key = cipherKey()

  const decipherIv = createDecipheriv(ALGORITHM, key, iv)
  decipherIv.setAuthTag(auth)

  const [buf1, buf2] = [decipherIv.update(cipher), decipherIv.final()]
  const deciphered = Buffer.concat([buf1, buf2], buf1.length, buf2.length)
  
  return deciphered.toString('utf8')
}

module.exports = {
  encrypt,
  decrypt
}
