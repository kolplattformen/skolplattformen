export interface Features {
  LOGIN_BANK_ID_SAME_DEVICE_WITHOUT_ID: boolean
  LOGIN_BANK_ID_SAME_DEVICE: boolean
  FOOD_MENU: boolean,
  CLASS_LIST: boolean
}

export type FeatureType = keyof Features
