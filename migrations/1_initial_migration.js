require("dotenv").config()
const CryptoAthletes = artifacts.require("CryptoAthletes")
const baseURI = process.env.BASE_URI

const generateList = () => {
  let tempList = []
  const maxElementCount = process.env.MAX_ELEMENT

  for (let i = 0; i < maxElementCount; i++) {
    tempList.push(i + 1)
  }

  return tempList
}

module.exports = function (deployer) {
  const defaultCounts = generateList()
  deployer.deploy(CryptoAthletes, baseURI, defaultCounts)
}
