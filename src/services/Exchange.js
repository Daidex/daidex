import { ZeroEx } from '0x.js'
import BigNumber from 'bignumber.js'

import { sortOrderbook } from 'src/methods'
import RadarRelay from './RadarRelay'

const TOKEN_DECIMALS = 18
const DECIMALS_TO_SHOW = 9

export default class ExchangeTrader {
  constructor({
    clientAddress,
    radarRelayApi,
    networkId,
    tokens,
  }) {
    this.tokens = tokens
    this.clientAddress = clientAddress
    this.zeroEx = new ZeroEx(global.web3.currentProvider, { networkId })
    this.radarRelay = new RadarRelay(radarRelayApi)
  }

  makeTrading = ({
    amount,
    willPayWithWETH = true,
    tokenA
  }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const orderbook = await this.radarRelay.getOrderbookAsync({
          baseTokenAddress: this.tokens.WETH,
          quoteTokenAddress: this.tokens[tokenA]
        })

        console.log('orderbook for', {
          baseToken: 'WETH',
          quoteToken: tokenA,
          baseTokenAddress: this.tokens.WETH,
          quoteTokenAddress: this.tokens[tokenA]
        })

        const sortedOrderbook = sortOrderbook(orderbook.data)
        const sortedAsks = sortedOrderbook.asks
        const sortedBids = sortedOrderbook.bids

        const takerTokenAmount = ZeroEx.toBaseUnitAmount(new BigNumber(parseFloat(amount)), TOKEN_DECIMALS)
        const ordersToFill = await this.fillOrders(sortedBids, sortedAsks, willPayWithWETH, takerTokenAmount)

        console.log('willPayWithWETH', willPayWithWETH)
        console.log('ordersTofill', ordersToFill)
        console.log('takerTokenAmount', takerTokenAmount)

        const transaction = await this.batchFillOrdersAsync(ordersToFill, willPayWithWETH)

        resolve(transaction)
      } catch (error) {
        reject(error)
      }
    })
  }

  batchFillOrdersAsync = async (ordersToFill) => {
    return new Promise(async (resolve, reject) => {
      try {
        const fillTxHash = await this.zeroEx.exchange.batchFillOrdersAsync(
          ordersToFill,
          true,
          this.clientAddress
        )
        const res = await this.zeroEx.awaitTransactionMinedAsync(fillTxHash, 1500)
        const transactionData = {
          amountReceived: ZeroEx.toUnitAmount(res.logs[2].args.filledMakerTokenAmount, TOKEN_DECIMALS),
          amountPaid: ZeroEx.toUnitAmount(res.logs[2].args.filledTakerTokenAmount, TOKEN_DECIMALS),
          fillTxHash
        }

        resolve(transactionData)
      } catch (error) {
        console.error(error)
        reject(error)
      }
    })
  }

  getAmountToReceive = async (amount, orders) => {
    let amountToPay = ZeroEx.toBaseUnitAmount(new BigNumber(amount), DECIMALS_TO_SHOW)
    let amountToReceive = new BigNumber(0)

    /* eslint-disable */
    for (let order of orders) {
      const takerFilledAmount = await this.zeroEx.exchange.getFilledTakerAmountAsync(
        ZeroEx.getOrderHashHex(order)
      )

      let takerFilledAmountCut = takerFilledAmount.div(new BigNumber(10 ** (TOKEN_DECIMALS - DECIMALS_TO_SHOW)))
      takerFilledAmountCut = new BigNumber(parseInt(takerFilledAmountCut.toNumber()))
      let rate = order.makerTokenAmount.div(order.takerTokenAmount)
      let makerFilledAmount = takerFilledAmount.times(rate)
      let makerFilledAmountCut = makerFilledAmount.div(new BigNumber(10 ** (TOKEN_DECIMALS - DECIMALS_TO_SHOW)))
      makerFilledAmountCut = new BigNumber(parseInt(makerFilledAmountCut.toNumber()))
      let takerTokenAmountCut = order.takerTokenAmount.div(new BigNumber(10 ** (TOKEN_DECIMALS - DECIMALS_TO_SHOW)))
      takerTokenAmountCut = new BigNumber(parseInt(takerTokenAmountCut.toNumber())).minus(takerFilledAmountCut)
      let makerTokenAmountCut = order.makerTokenAmount.div(new BigNumber(10 ** (TOKEN_DECIMALS - DECIMALS_TO_SHOW)))
      makerTokenAmountCut = new BigNumber(parseInt(makerTokenAmountCut.toNumber())).minus(makerFilledAmountCut)

      if (takerTokenAmountCut.lt(amountToPay)) {
        amountToReceive = amountToReceive.plus(makerTokenAmountCut)
        amountToPay = amountToPay.minus(takerTokenAmountCut)
      } else {
        amountToReceive = amountToReceive.plus(amountToPay.times(rate))
        break
      }
    }

    /* eslint-enable */

    return ZeroEx.toUnitAmount(new BigNumber(parseInt(amountToReceive, 10)), DECIMALS_TO_SHOW).toNumber()
  }


  fillOrders = (sortedBids, sortedAsks, willPayWithWETH, takerTokenAmount) => {
    return new Promise(async (resolve) => {
      const result = []

      /* eslint-disable */
      if (willPayWithWETH) {
        for (let bidOrder of sortedBids) {
          const takerFilledAmount = await this.zeroEx.exchange.getFilledTakerAmountAsync(
            ZeroEx.getOrderHashHex(bidOrder)
          )

          if (bidOrder.takerTokenAmount != takerFilledAmount) {
            if (bidOrder.takerTokenAmount.lte(takerTokenAmount)) {
              result.push({ signedOrder: bidOrder, takerTokenFillAmount: bidOrder.takerTokenAmount })
              takerTokenAmount.minus(bidOrder.takerTokenAmount)
            } else {
              result.push({ signedOrder: bidOrder, takerTokenFillAmount: takerTokenAmount })
              break
            }
          }
        }
      } else {
        for (let askOrder of sortedAsks) {
          const takerFilledAmount = await this.zeroEx.exchange.getFilledTakerAmountAsync(
            ZeroEx.getOrderHashHex(askOrder)
          )

          if (askOrder.takerTokenAmount != takerFilledAmount) {
            if (askOrder.takerTokenAmount.lte(takerTokenAmount)) {
              result.push({ signedOrder: askOrder, takerTokenFillAmount: askOrder.takerTokenAmount })
              takerTokenAmount.minus(askOrder.takerTokenAmount)
            } else {
              result.push({ signedOrder: askOrder, takerTokenFillAmount: takerTokenAmount })
              break
            }
          }
        }
      }
      /* eslint-enable */

      resolve(result)
    })
  }
}
