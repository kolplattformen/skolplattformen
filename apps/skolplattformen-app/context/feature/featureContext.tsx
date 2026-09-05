import { Features, FeatureType } from '@skolplattformen/api'
import React, { PropsWithChildren } from 'react'

export const FeatureFlagsContext = React.createContext<Features>({
  LOGIN_BANK_ID_SAME_DEVICE_WITHOUT_ID: true,
  LOGIN_FREJA_EID: false,
  FOOD_MENU: false,
  CLASS_LIST: true,
})

interface Props {
  features: Features
}

export const FeatureProvider: React.FC<PropsWithChildren<Props>> = ({
  features,
  children,
}) => {
  return (
    <FeatureFlagsContext.Provider value={features}>
      {children}
    </FeatureFlagsContext.Provider>
  )
}
