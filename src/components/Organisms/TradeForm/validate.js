import { get } from 'lodash'
import store from 'src/store'

let state

store.subscribe(() => {
  state = store.getState()
})

const validate = (values) => {
  const { data: { dropdown, wallet } } = state.app
  const { takerChoice } = dropdown

  const token = get(wallet, `balances[${takerChoice}]`, {})

  const errors = {}

  if (token.enabled !== true) {
    errors.taker = `Debes habilitar ${token.symbol} para negociar.`
  } else if (!values.taker) {
    errors.taker = 'Ingresa un valor.'
  } else if (values.taker >= token.balance) {
    errors.taker = 'Fondos insuficientes para esta transaccion.'
  }

  return errors
}

export default validate
