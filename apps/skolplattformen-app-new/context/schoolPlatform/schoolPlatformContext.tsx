import useSettingsStorage from '../../hooks/useSettingsStorage';
import React, {createContext} from 'react';

interface SchoolPlatformProps {
  currentSchoolPlatform?: string;
  changeSchoolPlatform: (platform: string) => void;
}

const defaultState: SchoolPlatformProps = {
  changeSchoolPlatform: (platform: string) =>
    console.log('DEBUG ONLY: changing to', platform),
};

type SchoolPlatformProviderProps = {
  children: React.ReactNode;
};

export const SchoolPlatformProvider: React.FC<SchoolPlatformProviderProps> = ({
  children,
}) => {
  const [currentSchoolPlatform, setCurrentSchoolPlatform] = useSettingsStorage(
    'currentSchoolPlatform',
  );

  const changeSchoolPlatform = (platform: any) => {
    setCurrentSchoolPlatform(platform);
  };

  return (
    <SchoolPlatformContext.Provider
      value={{
        currentSchoolPlatform,
        changeSchoolPlatform,
      }}>
      {children}
    </SchoolPlatformContext.Provider>
  );
};

export const SchoolPlatformContext =
  createContext<SchoolPlatformProps>(defaultState);
