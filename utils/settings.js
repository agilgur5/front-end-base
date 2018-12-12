// set by back-end template or default to / in dev and /static/ in prod
export const STATIC_URL = window.STATIC_URL ||
  '/' + (process.env.NODE_ENV === 'production' ? 'static/' : '')
