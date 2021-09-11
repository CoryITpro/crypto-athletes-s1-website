import FormData from "form-data"
import dotenv from "dotenv"
import axios from "axios"
import fs from "fs"

dotenv.config()

export const pinJSONToIPFS = async (JSONBody) => {
  const url = process.env.IPFS_URL_JSON
  return axios
    .post(url, JSONBody, {
      headers: {
        pinata_api_key: process.env.APP_PINATA_KEY,
        pinata_secret_api_key: process.env.APP_PINATA_SECRET,
      },
    })
    .then((res) => ({
      success: true,
      pinataUrl: res.data.IpfsHash,
    }))
    .catch((err) => ({
      success: false,
      message: err.message,
    }))
}

export const pinFileToIPFS = async (fileName) => {
  const url = process.env.IPFS_URL_FILE

  let formData = new FormData()
  formData.append("file", fs.createReadStream(fileName))

  const metadata = JSON.stringify({
    name: "image",
    keyValue: {
      key: "value",
    },
  })
  formData.append("pinataMetadata", metadata)

  const pinataOptions = JSON.stringify({
    cidVersion: 0,
    customPinPolicy: {
      regions: [
        {
          id: "FRA1",
          desiredRelicationCount: 1,
        },
        {
          id: "NYC1",
          desiredRelicationCount: 2,
        },
      ],
    },
  })
  formData.append("pinataOptions", pinataOptions)

  return axios
    .post(url, formData, {
      maxBodyLength: "Infinity",
      headers: {
        "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
        pinata_api_key: process.env.APP_PINATA_KEY,
        pinata_secret_api_key: process.env.APP_PINATA_SECRET,
      },
    })
    .then((res) => ({
      success: true,
      pinataUrl: res.data.IpfsHash,
    }))
    .catch((err) => ({
      success: false,
      message: err.message,
    }))
}

export const removePinFromIPFS = (hashToUnpin) => {
  if (hashToUnpin.indexOf("/") > -1) {
    hashToUnpin = hashToUnpin.substring(hashToUnpin.lastIndexOf("/") + 1)
  }
  const url = `${process.env.IPFS_URL_UNPIN}${hashToUnpin}`
  return axios
    .delete(url, {
      headers: {
        pinata_api_key: process.env.APP_PINATA_KEY,
        pinata_secret_api_key: process.env.APP_PINATA_SECRET,
      },
    })
    .then((res) => {
      console.log(res.message)
    })
    .catch((err) => {
      console.log(err.message)
    })
}
