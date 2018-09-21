import { ZeroEx } from '0x.js'
import BigNumber from 'bignumber.js'

export default class ZeroExWrapper {
  constructor({
    currentProvider,
    networkId,
  }) {
    this.instance = new ZeroEx(currentProvider, { networkId })
  }

  enableTokenTrading = async (tokenAddress, accountAddress) => {
    const enableTx = await this.instance.token.setUnlimitedProxyAllowanceAsync(
      tokenAddress,
      accountAddress,
    )

    return enableTx
  }

  disableTokenTrading = async (tokenAddress, accountAddress) => {
    const amount = new BigNumber(0.00) // eslint-disable-line

    const disableTx = await this.instance.token.setProxyAllowanceAsync(
      tokenAddress,
      accountAddress,
      amount
    )
    return disableTx
  }

  modifyAllowence = ({
    tokenAddress,
    accountAddress,
    enable
  }) => {
    const method = enable
      ? this.enableTokenTrading
      : this.disableTokenTrading

    return new Promise(async (resolve, reject) => {
      try {
        const response = await method(tokenAddress, accountAddress)
        const isConfirmed = await this.instance
          .awaitTransactionMinedAsync(response, 1500)

        resolve(isConfirmed)
      } catch (error) {
        console.error('error modifying allowence', error)
        reject(error)
      }
    })
  }
}
