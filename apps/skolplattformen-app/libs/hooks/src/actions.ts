import { EntityAction, EntityName, ExtraActionProps } from './types'

export const loadAction = <T>(
  entity: EntityName,
  extra: ExtraActionProps<T>
): EntityAction<T> => ({
  entity,
  extra,
  type: 'GET_FROM_API',
})
