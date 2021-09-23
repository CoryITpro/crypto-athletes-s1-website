require("dotenv").config()
const CryptoAthletes = artifacts.require("CryptoAthletes")
const baseURI = process.env.BASE_URI

module.exports = function (deployer) {
  deployer.deploy(CryptoAthletes, baseURI)
}
