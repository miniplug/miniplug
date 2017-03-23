export default function systemPlugin () {
  return (mp) => {
    function onMessage (text) {
      mp.emit('systemMessage', text)
    }

    mp.on('connected', () => {
      mp.ws.on('plugMessage', onMessage)
    })
  }
}
