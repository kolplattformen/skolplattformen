import { Feature } from '@skolplattformen/api'
import React from 'react'

const FeatureFlagsContext = React.createContext<Feature[]>([])

interface Props {
  features: Feature[]
}

export const FeatureProvider: React.FC<Props> = (props) => {
  return (
    <FeatureFlagsContext.Provider value={props.features} {...props}>
      {props.children}
    </FeatureFlagsContext.Provider>
  )
}

export const useFeature = (name: string) => {
  const features = React.useContext<Feature[]>(FeatureFlagsContext)
  if (features === null) {
    throw new Error('You must wrap your components in a FeatureProvider.')
  }

  const feature = features.find((f) => f.name === name)

  return feature && feature.enabled
}
