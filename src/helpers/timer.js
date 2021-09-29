const convertTimeZone = (date, timezoneString) =>
  new Date(
    (typeof date === "string" ? new Date(date) : date).toLocalString("en-US", {
      timeZone: timezoneString,
    })
  )

export const calculateTimeLeft = () => {
  const presaleDate = new Date(Date.UTC(2021, 9, 5, 23, 0, 0))
  const difference = presaleDate - new Date()

  console.log(presaleDate, new Date(), difference)

  let timeLeft = {}

  if (difference > 0) {
    timeLeft = {
      days:
        Math.floor(difference / (1000 * 60 * 60 * 24)) < 10
          ? `0${Math.floor(difference / (1000 * 60 * 60 * 24))}`
          : `${Math.floor(difference / (1000 * 60 * 60 * 24))}`,
      hours:
        Math.floor((difference / (1000 * 60 * 60)) % 24) < 10
          ? `0${Math.floor((difference / (1000 * 60 * 60)) % 24)}`
          : `${Math.floor((difference / (1000 * 60 * 60)) % 24)}`,
      minutes:
        Math.floor((difference / 1000 / 60) % 60) < 10
          ? `0${Math.floor((difference / 1000 / 60) % 60)}`
          : `${Math.floor((difference / 1000 / 60) % 60)}`,
      seconds:
        Math.floor((difference / 1000) % 60) < 10
          ? `0${Math.floor((difference / 1000) % 60)}`
          : `${Math.floor((difference / 1000) % 60)}`,
    }
  }

  return timeLeft
}
