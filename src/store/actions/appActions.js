import { createAction } from 'src/utils'

export const TOGGLE_LOADING = '@app/TOGGLE_LOADING'
export const CHANGE_VIEW = '@app/CHANGE_VIEW'
export const SET_NETWORK = '@app/SET_NETWORK'
export const INIT_EXCHANGE = '@app/INIT_EXCHANGE'
export const SET_WALLET = '@app/SET_WALLET'

const toggleLoadingAction = createAction(TOGGLE_LOADING)
const changeViewAction = createAction(CHANGE_VIEW)
const setNetworkAction = createAction(SET_NETWORK)
const initExchangeAction = createAction(INIT_EXCHANGE)
const setWalletAction = createAction(SET_WALLET)

export const toggleLoading = isLoading => toggleLoadingAction({ isLoading })
export const changeView = nextView => changeViewAction({ nextView })
export const setNetwork = networkId => setNetworkAction({ networkId })
export const initExchange = address => initExchangeAction({ address })
export const setWallet = ({ address }) => setWalletAction({ address })
