import { user } from '../user'

let response: any

beforeEach(() => {
  response = {
    socialSecurityNumber: '197106171635',
    isAuthenticated: true,
    userFirstName: 'Per-Ola',
    userLastName: 'Assarsson',
    userEmail: 'per-ola.assarsson@dodgit.com',
    notificationId:
      'B026594053D44299AB64ED81990B49C04D32F635C9A3454A84030439BFDDEF04',
  }
})

it('parses user correctly', () => {
  expect(user(response)).toEqual({
    personalNumber: '197106171635',
    firstName: 'Per-Ola',
    lastName: 'Assarsson',
    email: 'per-ola.assarsson@dodgit.com',
    isAuthenticated: true,
    notificationId:
      'B026594053D44299AB64ED81990B49C04D32F635C9A3454A84030439BFDDEF04',
  })
})
