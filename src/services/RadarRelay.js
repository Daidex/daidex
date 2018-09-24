import axios from 'axios'

export default class RadarRelay {
  constructor(baseURL) {
    this.baseURL = baseURL
  }

  getOrderbookAsync(params) {
    const url = `${this.baseURL}orderbook`

    return axios.get(url, { params })
  }

  getTokenPairsAsync(baseToken) {
    const url = `${this.baseURL}token_pairs`

    return axios.get(url, {
      params: { tokenA: baseToken }
    })
  }

  getOrdersAsync() {
    const url = `${this.baseURL}orders`

    return axios.get(url)
  }
}
