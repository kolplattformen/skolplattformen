const { encrypt, decrypt } = require('./crypto')

describe('crypto', () => {
  it('encrypts', () => {
    const encrypted = encrypt('message')
    expect(typeof encrypted).toBe('string')
  })
  it('decrypts', () => {
    const encrypted = encrypt('message')
    const decrypted = decrypt(encrypted)
    expect(decrypted).toEqual('message')
  })
  it('decrypts long texts', () => {
    const msg = `
    lorem ipsum dolor sit amet, consectetur adipiscing elit
    ut aliquam, purus sit amet luctus venenatis, lectus magna
    fringilla urna, porttitor rhoncus dolor purus non enim
    praesent elementum facilisis leo, vel fringilla est
    ullamcorper eget nulla facilisi etiam dignissim diam quis
    enim lobortis scelerisque fermentum dui faucibus in ornare
    quam viverra orci sagittis eu volutpat odio facilisis
    mauris sit amet massa vitae tortor condimentum lacinia
    quis vel eros donec ac odio tempor orci dapibus ultrices
    in iaculis nunc sed augue lacus, viverra vitae congue eu,
    consequat ac felis donec et odio pellentesque diam volutpat
    commodo sed egestas egestas fringilla phasellus faucibus
    `
    const encrypted = encrypt(msg)
    const decrypted = decrypt(encrypted)
    expect(decrypted).toEqual(msg)
  })
})
