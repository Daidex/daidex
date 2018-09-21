import axios from 'axios'

const BASE_URL = 'https://min-api.cryptocompare.com/data/price'

export const convertTokenTo = ({ from, to = 'MXN', value = 1 }) => {
  return new Promise((resolve, reject) => {
    axios.get(BASE_URL, {
      params: {
        fsym: from,
        tsyms: to,
      }
    })
      .then(({ data }) => resolve(data[to] * value))
      .catch(reject)
  })
}

export default {
  convertTokenTo,
}
