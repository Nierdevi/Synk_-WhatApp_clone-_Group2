import Toast from 'react-native-root-toast';

const showToast = (message, duration = Toast.durations.LONG,  ) => {
    console.log("toast msg: ",message)
    Toast.show(message, {
        duration: duration,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
};

export default showToast;
