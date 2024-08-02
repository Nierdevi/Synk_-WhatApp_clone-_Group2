import Toast from 'react-native-root-toast';
import { primaryColors, SecondaryColors } from '../constants/colors';
import { widthPercentageToDP as wp} from 'react-native-responsive-screen';

const showToast = (message, duration = Toast.durations.LONG) => {
    const trimmedMessage = message.trim();
    console.log("Original message: ", message);
    console.log("Trimmed message: ", trimmedMessage);

    Toast.show(trimmedMessage, {
        duration: duration,
        position: Toast.positions.BOTTOM,
        shadow: false,
        animation: true,
        hideOnPress: true,
        delay: 0,
        backgroundColor:primaryColors.purple,
        containerStyle:{width:wp('50%')}

    });
};

export default showToast;
