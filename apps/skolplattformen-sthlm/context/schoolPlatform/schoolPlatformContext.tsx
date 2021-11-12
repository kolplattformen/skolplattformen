import useSettingsStorage from '../../hooks/useSettingsStorage'
import React, { createContext } from 'react'

interface SchoolPlatformProps {
  currentSchoolPlatform: string
  changeSchoolPlatform: (platform: string) => void
}

const defaultState: SchoolPlatformProps = {
  currentSchoolPlatform: 'stockholm-skolplattformen',
  changeSchoolPlatform: (platform: string) =>
    console.log('DEBUG ONLY: changing to', platform),
}

export const SchoolPlatformProvider: React.FC = ({ children }) => {
  const [currentSchoolPlatform, setCurrentSchoolPlatform] = useSettingsStorage(
    'currentSchoolPlatform'
  )

  const changeSchoolPlatform = (platform: string) => {
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
