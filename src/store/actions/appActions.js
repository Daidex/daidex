import { createAction } from 'src/utils'

export const TOGGLE_LOADING = '@app/TOGGLE_LOADING'
export const CHANGE_VIEW = '@app/CHANGE_VIEW'
export const SET_NETWORK = '@app/SET_NETWORK'
export const INIT_EXCHANGE = '@app/INIT_EXCHANGE'
export const UPDATE_ACCOUNT = '@app/UPDATE_ACCOUNT'
export const UPDATE_BALANCES = '@app/UPDATE_BALANCES'
export const SET_MESSAGE_WRAP = '@app/SET_MESSAGE_WRAP'

const toggleLoadingAction = createAction(TOGGLE_LOADING)
const changeViewAction = createAction(CHANGE_VIEW)
const setNetworkAction = createAction(SET_NETWORK)
const initExchangeAction = createAction(INIT_EXCHANGE)
const updateAccountAction = createAction(UPDATE_ACCOUNT)
const updateBalancesAction = createAction(UPDATE_BALANCES)
const setMessageWrapAction = createAction(SET_MESSAGE_WRAP)

export const toggleLoading = isLoading => toggleLoadingAction({ isLoading })
export const changeView = nextView => changeViewAction({ nextView })
export const setNetwork = networkId => setNetworkAction({ networkId })
export const initExchange = address => initExchangeAction({ address })
export const updateAccount = ({ address }) => updateAccountAction({ address })
export const updateBalances = balances => updateBalancesAction({ balances })
export const setMessageWrap = message => setMessageWrapAction({ message })
