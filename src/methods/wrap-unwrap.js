export function getNetworkId() {
  return new Promise((resolve) => {
    global.web3.version.getNetwork((error, networkId) => (
      resolve(parseInt(networkId, 10))
    ))
  })
}

export function wrap_ether(amount, weth_address) {
  return new Promise((resolve) => {
    global.web3.eth.contract([{
      constant: false,
      inputs: [],
      name: 'deposit',
      outputs: [],
      payable: true,
      stateMutability: 'payable',
      type: 'function'
    }])
      .at(weth_address).deposit({
        value: amount * (10 ** 18)
      }, (err, res) => {
        if (res !== undefined) {
          resolve(res)
        } else {
          resolve(err.message)
        }
      })
  })
}

export function unwrap_ether(amount, weth_address) {
  const value = amount * (10 ** 18)
  return new Promise((resolve) => {
    global.web3.eth.contract([{
      constant: false,
      inputs: [{
        name: 'wad',
        type: 'uint256'
      }],
      name: 'withdraw',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    }])
      .at(weth_address).withdraw(
        value, {}, (err, res) => {
          if (res !== undefined) {
            resolve(res)
          } else {
            resolve(err.message)
          }
        }
      )
  })
}
