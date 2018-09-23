import axios from 'axios'

const BASE_URL = 'https://min-api.cryptocompare.com/data/price'

const convertWETH = (value) => {
  return value !== 'WETH' ? value : 'ETH'
}

export const convertTokenTo = ({ from, to = 'MXN', value = 1 }) => {
  return new Promise((resolve, reject) => {
    axios.get(BASE_URL, {
      params: {
        fsym: convertWETH(from),
        tsyms: convertWETH(to),
      }
    })
      .then(({ data }) => resolve(data[convertWETH(to)] * value))
      .catch(reject)
  })
}

export default {
  convertTokenTo,
}
