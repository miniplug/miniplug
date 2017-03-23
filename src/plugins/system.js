export default function systemPlugin () {
  return (mp) => {
    function onMessage (text) {
      mp.emit('systemMessage', text)
    }

    function onMaintenanceAlert (minutesLeft) {
      mp.emit('maintenanceAlert', minutesLeft)
    }

    function onMaintenance () {
      mp.emit('maintenance')
    }

    mp.on('connected', () => {
      mp.ws.on('plugMessage', onMessage)
      mp.ws.on('plugMaintenanceAlert', onMaintenanceAlert)
      mp.ws.on('plugMaintenance', onMaintenance)
    })
  }
}
