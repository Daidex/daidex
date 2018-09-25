import { createAction } from 'src/utils'
import { convertTokenTo } from 'src/services/currency'
import { without, omit, forEach } from 'lodash'

import { sortOrderbook } from 'src/methods'

export const TOGGLE_LOADING = '@app/TOGGLE_LOADING'
export const CHANGE_VIEW = '@app/CHANGE_VIEW'
export const SET_NETWORK = '@app/SET_NETWORK'
export const INIT_EXCHANGE = '@app/INIT_EXCHANGE'
export const UPDATE_ACCOUNT = '@app/UPDATE_ACCOUNT'
export const UPDATE_BALANCES = '@app/UPDATE_BALANCES'
export const SET_MESSAGE_WRAP = '@app/SET_MESSAGE_WRAP'
export const UPDATE_ALLOWENCE = '@app/UPDATE_ALLOWENCE'
export const SET_CURRENCY_EXCHANGE = '@app/SET_CURRENCY_EXCHANGE'
export const SET_DROPDOWN_OPTION = '@app/SET_DROPDOWN_OPTION'
export const SUBSCRIBE_TO_ORDERBOOK = '@app/SUBSCRIBE_TO_ORDERBOOK'
export const UPDATE_ORDERBOOK = '@app/UPDATE_ORDERBOOK'
export const SET_MESSAGE_WARN = '@app/SET_MESSAGE_WARN'

const toggleLoadingAction = createAction(TOGGLE_LOADING)
const changeViewAction = createAction(CHANGE_VIEW)
const setNetworkAction = createAction(SET_NETWORK)
const initExchangeAction = createAction(INIT_EXCHANGE)
const updateAccountAction = createAction(UPDATE_ACCOUNT)
const updateBalancesAction = createAction(UPDATE_BALANCES)
const setMessageWrapAction = createAction(SET_MESSAGE_WRAP)
const updateAllowenceAction = createAction(UPDATE_ALLOWENCE)
const setCurrentExchageAction = createAction(SET_CURRENCY_EXCHANGE)
const setDropdownOptionAction = createAction(SET_DROPDOWN_OPTION)
const subscribeToOrderbookAction = createAction(SUBSCRIBE_TO_ORDERBOOK)
const updateOrderbookAction = createAction(UPDATE_ORDERBOOK)
const setMessageWarnAction = createAction(SET_MESSAGE_WARN)

export const toggleLoading = isLoading => toggleLoadingAction({ isLoading })
export const changeView = nextView => changeViewAction({ nextView })
export const setNetwork = networkId => setNetworkAction({ networkId })
export const initExchange = address => initExchangeAction({ address })
export const updateAccount = ({ address }) => updateAccountAction({ address })
export const updateBalances = balances => updateBalancesAction({ balances })
export const setMessageWrap = message => setMessageWrapAction({ message })
export const setMessageWarn = data => setMessageWarnAction({ data })
export const updateAllowence = ({ tokenSymbol, state }) => {
  return updateAllowenceAction({ tokenSymbol, state })
}
export const setDropdownOption = field => setDropdownOptionAction({ ...field })
export const updateOrderbook = (tokenOrderbook) => {
  return updateOrderbookAction({ ...tokenOrderbook })
}

export const getCurrencyExchange = tokensKeys => (dispatch) => {
  const tokens = without([
    'ETH',
    ...tokensKeys
  ], 'WETH')

  return Promise.all(
    tokens.map(token => convertTokenTo({ from: token }))
  )
    .then((results) => {
      const tokensValues = tokens.reduce((result, value, key) => ({
        ...result,
        [value]: results[key]
      }), {})

      dispatch(setCurrentExchageAction({ tokens: tokensValues }))
    })
    // TODO: handle error
    .catch(console.log)
}

export const subscribeToOrderbook = (websocket, tokens) => (dispatch) => {
  dispatch(subscribeToOrderbookAction())
  const socket = new global.WebSocket(websocket)
  const addressWETH = tokens.WETH
  const tokensAddress = omit(tokens, ['WETH'])

  forEach(tokensAddress, (token) => {
    socket.addEventListener('open', () => {
      socket.send(`{
        "type": "subscribe",
        "channel": "orderbook",
        "requestId": 1,
        "payload": {
          "baseTokenAddress": "${addressWETH}",
          "quoteTokenAddress": "${token}",
          "snapshot": true,
          "limit": 100
          }
        }`);
    });
  })

  console.log('init socket')

  socket.addEventListener('message', (event) => {
    const data = JSON.parse(event.data)
    if (data.channel === 'orderbook') {
      const token = data.quoteTokenAddress
      const tokenOrderbook = sortOrderbook(data.payload)

      dispatch(updateOrderbook({
        token,
        orderbook: tokenOrderbook,
      }))
      console.log('Change detected in orderbook')
    }
  })
}
