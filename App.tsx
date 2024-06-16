import 'react-native-gesture-handler'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { CounterScreen } from './src/screens/CounterScreen'
import { IndexScreen } from './src/screens/IndexScreen'
import { NavigationContainer } from '@react-navigation/native'
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  createDrawerNavigator,
} from '@react-navigation/drawer'
import { Text, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { Styles } from './src/themes/GeneralThemes'
import { PokemoScreen } from './src/screens/PokemoScreen'

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

export type RootStackParams = {
  HomeScreen: undefined;
  PokemonScreen: { pokemonId: number };
  SearchScreen: undefined;
}

function GeneralDrawer() {
  const { width } = useWindowDimensions()
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerType: width >= 768 ? 'permanent' : 'front',
      }}
      drawerContent={(props) => <MenuInterno {...props} />}
    >
      <Drawer.Screen name="IndexScreen" component={IndexScreen} />
      <Drawer.Screen name="CounterScreen" component={CounterScreen} />
      <Drawer.Screen name="PokemoScreen" component={PokemoScreen} />


    </Drawer.Navigator>
  )
}

const MenuInterno: React.FC<DrawerContentComponentProps> = ({ navigation }) => {
  return (
    <DrawerContentScrollView>
      <View style={Styles.menuContainer} >
        <View style={{ flexDirection: 'row', padding: 20 }}>
          <Icon name="timer" color={'black'} size={25} />
          <TouchableOpacity
            onPress={() => navigation.navigate('CounterScreen')}
          >
            <Text style={Styles.menuText} >Counter Screen</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', padding: 20 }}>
          <Icon name="home" color={'black'} size={25} />

          <TouchableOpacity onPress={() => navigation.navigate('IndexScreen')}>
            <Text style={Styles.menuText} >Index Screen</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', padding: 20 }}>
          <Icon name="aperture" color={'black'} size={25} />

          <TouchableOpacity onPress={() => navigation.navigate('PokemoScreen')}>
            <Text style={Styles.menuText} >Api Pokemon</Text>
          </TouchableOpacity>
        </View>
      </View>
    </DrawerContentScrollView>
  )
}

function GeneralStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CounterScreen" component={CounterScreen} />
      <Stack.Screen name="IndexScreen" component={IndexScreen} />

    </Stack.Navigator>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <GeneralDrawer />
    </NavigationContainer>
  )
}

export default App
