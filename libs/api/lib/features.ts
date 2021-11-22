export interface Features {
    LOGIN_BANK_ID_SAME_DEVICE: boolean;
    FOOD_MENU: boolean;
}

export type FeatureType = keyof Features;
