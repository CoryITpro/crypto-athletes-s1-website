require("dotenv").config()
const CryptoAthletes = artifacts.require("CryptoAthletes")
const baseURI = process.env.BASE_URI

console.log(baseURI)

module.exports = function (deployer) {
  deployer.deploy(CryptoAthletes, baseURI)
}
