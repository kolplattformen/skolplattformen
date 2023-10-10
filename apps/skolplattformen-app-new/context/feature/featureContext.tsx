// import {Features, FeatureType} from '../../libs/api/lib'';
import {Features} from '../../libs/api/lib';

import React from 'react';

export const FeatureFlagsContext = React.createContext<Features>({
  LOGIN_BANK_ID_SAME_DEVICE_WITHOUT_ID: true,
  FOOD_MENU: false,
  CLASS_LIST: true,
  LOGIN_FREJA_EID: false, //! this has been added
});

interface Props {
  features: Features;
  children: React.ReactNode; //! this has been added
}

export const FeatureProvider: React.FC<Props> = props => {
  return (
    <FeatureFlagsContext.Provider value={props.features} {...props}>
      {props.children}
    </FeatureFlagsContext.Provider>
  );
};
