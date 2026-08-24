import useSettingsStorage from '../../hooks/useSettingsStorage'
import React, { createContext, PropsWithChildren } from 'react'

interface SchoolPlatformProps {
  currentSchoolPlatform?: string
  changeSchoolPlatform: (platform: string) => void
}

const defaultState: SchoolPlatformProps = {
  changeSchoolPlatform: (platform: string) =>
    console.log('DEBUG ONLY: changing to', platform),
}

export const SchoolPlatformProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const [currentSchoolPlatform, setCurrentSchoolPlatform] = useSettingsStorage(
    'currentSchoolPlatform'
  )

  const changeSchoolPlatform = (platform) => {
    setCurrentSchoolPlatform(platform)
  }

  return (
    <SchoolPlatformContext.Provider
      value={{
        currentSchoolPlatform,
        changeSchoolPlatform,
      }}
    >
      {children}
    </SchoolPlatformContext.Provider>
  )
}

export const SchoolPlatformContext =
  createContext<SchoolPlatformProps>(defaultState)
