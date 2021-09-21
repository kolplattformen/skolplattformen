const camel = require('camelcase-keys')

export interface EtjanstResponse {
  Success: boolean
  Error: string | null
  Data: any | any[]
}

export const etjanst = (response: EtjanstResponse): any | any[] => {
  if (!response.Success) {
    throw new Error(response.Error || '')
  }
  return camel(response.Data, { deep: true })
}
