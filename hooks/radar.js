import Radar from 'react-native-radar';

export function initRadar() {
  Radar.on('location', (result) => {
    console.log(result);
  });

  Radar.getPermissionsStatus()
    .then((status) => {
      console.log(' test123');
      if (status === 'DENIED') {
        Radar.requestPermissions(true).then(() => {
          Radar.startTrackingContinuous();
        });
      } else {
        Radar.startTrackingContinuous();
      }
    })
    .catch((err) => console.log(err));
}
