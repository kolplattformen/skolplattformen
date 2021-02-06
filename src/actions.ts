import {
  EntityAction, EntityName, ExtraActionProps,
} from './types'

// eslint-disable-next-line import/prefer-default-export
export const loadAction = <T>(entity: EntityName, extra: ExtraActionProps<T>): EntityAction<T> => ({
  entity,
  extra,
  type: 'GET_FROM_API',
})
