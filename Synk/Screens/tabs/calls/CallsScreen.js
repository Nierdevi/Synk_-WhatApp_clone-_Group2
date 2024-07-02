import { View, Text,StyleSheet,Button } from 'react-native'
import React from 'react'
import{getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {primaryColors,SecondaryColors} from '../../../constants/colors';
import { useTheme } from '../../../constants/themeContext';


export default function CallsScreen({navigation,route}) {

  const {theme,toggleTheme}=useTheme();


  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'CallsScreen';
    if (routeName === 'CallsScreen') {
<<<<<<< HEAD
      navigation.setOptions({ tabBarStyle: { display: 'flex',height:70,  } });
=======
      navigation.setOptions({ tabBarStyle: { display: 'flex',height:80},backgroundColor:theme === 'dark' ?  'black' :'white'   });
>>>>>>> 8035e89c037c9ef55245fc9444d0074e5a722d25
    } else {
      navigation.setOptions({ tabBarStyle: { display: 'none' } });
    }
  }, [navigation, route]);



    return (
        <View style={styles.container}>
          <Text>Call Screen </Text>
          {/* <Button title='tap' onPress={()=>{navigation.navigate('ChatRoom')}}/> */}
        </View>
      )
    }

    const styles=StyleSheet.create({
        container:{
            flex:1,
            alignItems:'center',
            justifyContent:'center'
        }
    })