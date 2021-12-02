export const lessonsUrl = (lessonParams: {forUser: string, startDateIso: string, endDateIso: string}) => {
    const urlEncodedParams = new URLSearchParams(lessonParams).toString()
    return `https://hjarntorget.goteborg.se/api/schema/lessons?${urlEncodedParams}`
}
export const hjarntorgetUrl = 'https://hjarntorget.goteborg.se'
export const currentUserUrl = 'https://hjarntorget.goteborg.se/api/core/current-user'
export const myChildrenUrl = 'https://hjarntorget.goteborg.se/api/person/children'
export const infoUrl = 'https://hjarntorget.goteborg.se/api/information/messages-by-date-desc?messageStatus=CURRENT&offset=0&limit=10&language=en'
export const fullImageUrl = (imagePath: string) => hjarntorgetUrl + imagePath;
export const infoSetReadUrl = (item: {id: string}) => `https://hjarntorget.goteborg.se/api/information/set-message-read?messageId=${item.id}`
export const hjarntorgetEventsUrl = 'https://hjarntorget.goteborg.se/api/events/events-sorted-by-name?offset=0&limit=100'
export const rolesInEventUrl = (eventId: number) => `https://hjarntorget.goteborg.se/api/event-members/roles?eventId=${eventId}&language=en`
export const membersWithRoleUrl = (eventId: number, roleId: string) => `https://hjarntorget.goteborg.se/api/event-members/members-having-role?eventId=${eventId}&roleId=${roleId}`
export const wallMessagesUrl = 'https://hjarntorget.goteborg.se/api/wall/events?language=en&limit=500'
export const beginLoginUrl = 'https://hjarntorget.goteborg.se'
export const calendarsUrl = 'https://hjarntorget.goteborg.se/pp/system/calendar/cal_events.jsp'
export const calendarEventUrl = (calendarId: string, startDate: string, endDate: string) =>  `${calendarsUrl}?order_by=start_date&show_cal_ids=${calendarId}&mode=separate&filter_start_date=${startDate}&filter_end_date=${endDate}&search_for=`

export const shibbolethLoginUrlBase = (beginLoginRedirectUrl: string) => {
    const returnUrlStart = beginLoginRedirectUrl.indexOf('return=') + 'return='.length
    return decodeURIComponent(beginLoginRedirectUrl.substring(returnUrlStart))
}

export const shibbolethLoginUrl = (returnUrl: string) => {
    return `${returnUrl}&entityID=${encodeURIComponent('https://auth.goteborg.se/FIM/sps/HjarntorgetEID/saml20')}`
}

export const initBankIdUrl = (shibbolethRedirectUrl: any) => {
    const targetParamIndex = shibbolethRedirectUrl.indexOf('Target=') + 'Target='.length
    const targetParam = decodeURIComponent(shibbolethRedirectUrl.substring(targetParamIndex))
    const initBankIdUrl = 'https://auth.goteborg.se/FIM/sps/BankID/saml20/logininitial?'
    const initBankIdParams =  `ITFIM_WAYF_IDP=${encodeURIComponent('https://m00-mg-local.idp.funktionstjanster.se/samlv2/idp/metadata/0/34')}` +
      `&submit=Mobilt+BankID` +
      `&ResponseBinding=HTTPPost` +
      `&RequestBinding=HTTPPost` +
      `&Target=${encodeURIComponent(targetParam)}` 
    return initBankIdUrl + initBankIdParams
  }

export const mvghostUrl = 'https://m00-mg-local.idp.funktionstjanster.se/samlv2/idp/req/0/34?mgvhostparam=0'

export const beginBankIdUrl = (beingBankIdUrlBase: string) => `${beingBankIdUrlBase}/ssn`

export const verifyUrlBase = (verifyUrl: string) => verifyUrl.substring(0, verifyUrl.length - 'verify'.length)

export const pollStatusUrl = (basePollingUrl: string) => `${basePollingUrl}pollstatus`

export const authGbgLoginUrl = 'https://auth.goteborg.se/FIM/sps/BankID/saml20/login'
export const hjarntorgetSAMLLoginUrl = 'https://hjarntorget.goteborg.se/Shibboleth.sso/SAML2/POST'