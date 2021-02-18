import { childName } from '../childHelpers'

describe('#childName', () => {
  test('should remove student from name', () => {
    expect(childName('Alan Nilsson (elev)')).toEqual('Alan Nilsson')
  })

  test('should remove student without spacing from name', () => {
    expect(childName('Alan Nilsson(elev)')).toEqual('Alan Nilsson')
  })

  test('handles undefined name', () => {
    expect(childName(undefined)).toBeUndefined()
  })
})
