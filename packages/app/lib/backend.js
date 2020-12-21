import init from "@skolplattformen/embedded-api"
export const api = init(fetch)  // keep a static version of this object so we can keep the session alive

