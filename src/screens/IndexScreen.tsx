import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'


interface Props extends StackScreenProps<any, any> {}

export const IndexScreen = ({navigation}:Props) => {
  return (
<View>
  <Text style={{color: 'black', fontSize: 20}} >Index Screen</Text>
  <TouchableOpacity
      onPress={()=> navigation.navigate('CounterScreen')}
  >
    <Text style={{color: 'black', fontSize: 20}}  >Counter</Text>
    </TouchableOpacity>
</View>
  )
}
