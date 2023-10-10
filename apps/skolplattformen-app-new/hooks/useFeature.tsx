import {Features, FeatureType} from '../libs/api/lib';
import React from 'react';
import {FeatureFlagsContext} from '../context/feature/featureContext';

export const useFeature = (name: FeatureType) => {
  const features = React.useContext<Features>(FeatureFlagsContext);
  if (features === null) {
    throw new Error('You must wrap your components in a FeatureProvider.');
  }

  return features[name];
};
