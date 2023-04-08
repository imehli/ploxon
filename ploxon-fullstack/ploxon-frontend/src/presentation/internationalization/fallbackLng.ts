export const fallbackLng = (): string => {
  return localStorage?.getItem('lng')
    ? JSON.parse(localStorage.getItem('lng'))
    : 'fr'
}
