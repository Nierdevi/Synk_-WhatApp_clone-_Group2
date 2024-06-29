import { View, Text,StyleSheet,Button } from 'react-native'
import React from 'react'
import{getFocusedRouteNameFromRoute} from '@react-navigation/native';

export default function CallsScreen({navigation,route}) {

  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'CallsScreen';
    if (routeName === 'CallsScreen') {
      navigation.setOptions({ tabBarStyle: { display: 'flex',height:800  } });
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