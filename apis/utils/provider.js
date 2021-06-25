const getProviderURL = (provider) => (token, ip) => {
  const providers = {
    amap: `https://restapi.amap.com/v5/ip?key=${token}&type=4&ip=${ip}`
  }

  return providers[provider]
}

module.exports = {
  getProviderURL: getProviderURL()
}
