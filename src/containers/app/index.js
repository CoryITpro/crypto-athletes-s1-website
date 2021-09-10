import { Web3ReactProvider } from "@web3-react/core"
import Web3 from "web3"

import AppRouter from "router"

const getLibrary = (provider) => {
  return new Web3(provider)
}

const App = () => (
  <Web3ReactProvider getLibrary={getLibrary}>
    <AppRouter />
  </Web3ReactProvider>
)

export default App
