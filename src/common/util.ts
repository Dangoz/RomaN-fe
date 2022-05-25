enum LS {
  method = 'CONNECT_METHOD',
  address = 'CONNECT_ADDRESS',
}

export const setLocalmethod = (method: string, address: string) => {
  localStorage.setItem(LS.method, method)
  localStorage.setItem(LS.address, address)
}

export const getLocalmethod = (): { method: string; address: string } => {
  const method = localStorage.getItem(LS.method) || ''
  const address = localStorage.getItem(LS.address) || ''
  return { method, address }
}

export const getStorage = (key: string): string => {
  const value = localStorage.getItem(key) || ''
  return value
}
