export function extractQueryParams(query) {
  return query.substr(1).split('&').reduce((quereParams, param) => {
    const [key, value] = param.split('=')

    quereParams[key] = value

    return quereParams
  }, {})
}