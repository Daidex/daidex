import axios from 'axios'

export default class RadarRelay {
  constructor(baseURL) {
    this.baseURL = baseURL
  }

  getOrderbookAsync(quote_token_address, base_token_address) {
    const url = `${this.baseURL}orderbook`

    return axios.get(url, {
      params: {
        baseTokenAddress: base_token_address,
        quoteTokenAddress: quote_token_address,
      }
    })
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
