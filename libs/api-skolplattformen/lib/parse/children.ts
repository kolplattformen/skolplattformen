import { etjanst } from './etjanst'
import { Child } from '../types'

export const child = ({ id, sdsId, name, status, schoolId }: any): Child => ({
  id,
  sdsId,
  name,
  status,
  schoolId,
})

export const children = (data: any): Child[] => etjanst(data).map(child)
