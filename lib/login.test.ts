import { Client } from './client'
import { login } from './login'
import routes from './routes'

describe('login', () => {
  let client: jest.Mocked<Client>
  beforeEach(() => {
    client = {
      post: jest.fn(),
    }
  })
  it('returns the correct result', async () => {
    const personalNumber = 'my personal number'
    const response = {
      json: async () => ({
        token: '9462cf77-bde9-4029-bb41-e599f3094613',
        order: '5fe57e4c-9ad2-4b52-b794-48adef2f6663',
      })
    }

    client.post.mockResolvedValue(response)
    const result = await login(client)(personalNumber)

    expect(result).toEqual({ token: '9462cf77-bde9-4029-bb41-e599f3094613' })
  })
})
