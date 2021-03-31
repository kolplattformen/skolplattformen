import { EntityAction, EntityName, ExtraActionProps } from './types';
export declare const loadAction: <T>(entity: EntityName, extra: ExtraActionProps<T>) => EntityAction<T>;
