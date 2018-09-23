import BigNumber from 'bignumber.js'

export const sortOrderbook = (orderbook) => {
  const sortedAsks = orderbook.asks.sort((orderA, orderB) => {
    const orderRateA = new BigNumber(orderA.takerTokenAmount)
      .div(new BigNumber(orderA.makerTokenAmount))
    const orderRateB = new BigNumber(orderB.takerTokenAmount)
      .div(new BigNumber(orderB.makerTokenAmount))

    return orderRateA.comparedTo(orderRateB)
  })

  const sortedBids = orderbook.bids.sort((orderA, orderB) => {
    const orderRateA = new BigNumber(orderA.makerTokenAmount)
      .div(new BigNumber(orderA.takerTokenAmount))
    const orderRateB = new BigNumber(orderB.makerTokenAmount)
      .div(new BigNumber(orderB.takerTokenAmount))

    return orderRateB.comparedTo(orderRateA)
  })

  sortedBids.forEach((bidOrder) => {
    bidOrder.takerTokenAmount = new BigNumber(bidOrder.takerTokenAmount)
    bidOrder.makerTokenAmount = new BigNumber(bidOrder.makerTokenAmount)
    bidOrder.takerFee = new BigNumber(bidOrder.takerFee)
    bidOrder.makerFee = new BigNumber(bidOrder.makerFee)
    bidOrder.expirationUnixTimestampSec = new BigNumber(bidOrder.expirationUnixTimestampSec)
  })
  sortedAsks.forEach((askOrder) => {
    askOrder.takerTokenAmount = new BigNumber(askOrder.takerTokenAmount)
    askOrder.makerTokenAmount = new BigNumber(askOrder.makerTokenAmount)
    askOrder.takerFee = new BigNumber(askOrder.takerFee)
    askOrder.makerFee = new BigNumber(askOrder.makerFee)
    askOrder.expirationUnixTimestampSec = new BigNumber(askOrder.expirationUnixTimestampSec)
  })
  return { asks: sortedAsks, bids: sortedBids }
}

export default { sortOrderbook }
