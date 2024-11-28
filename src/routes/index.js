import React from 'react'
import { View } from 'react-native'
import { IconUser, IconHome, IconMessage, IconSearch } from '../../assets/icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  Initial,
  Account,
  EditProfile,
  EditEmail,
  EditName,
  EditPhone,
  EditEnd,
  Home,
  Message,
  Chat,
  Register,
  Search,
  Settings,
  Accessibility,
  Language,
  Theme,
  YourAccount,
  UpdatePassword,
  RegisterMotorista,
  RegisterCrianca,
  ExibirCriancas,
  PerfilSearch,
  RegistroRota,
  ExibirRotas,
  RotaMap,
  Vagas,
} from '../screens'

export const BottomRoute = () => {
  const Tab = createBottomTabNavigator()

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let icon
          if (route.name === 'Home') {
            icon = <IconHome width={size} height={size} color={color} />
          } else if (route.name === 'Mensagens') {
            icon = <IconMessage width={size} height={size} color={color} />
          } else if (route.name === 'Pesquisa') {
            icon = <IconSearch width={size} height={size} color={color} />
          } else if (route.name === 'Perfil') {
            icon = <IconUser width={size} height={size} color={color} />
          }

          return icon
        },
        tabBarLabel: () => null, // Remover os rótulos
        tabBarActiveTintColor: '#272727', // Cor do ícone quando ativo
        tabBarInactiveTintColor: '#838383', // Cor do ícone quando inativo
        tabBarStyle: {
          position: 'absolute', // Torna o bottom tab flutuante
          bottom: 15,
          left: 20,
          right: 20,
          height: 60,
          borderRadius: 30,
          backgroundColor: '#EEEEEE',
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Mensagens"
        component={Chat}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Pesquisa"
        component={Search}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Perfil"
        component={Account}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  )
}

// Routes.js
export const Routes = () => {
  const Stack = createNativeStackNavigator()
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={Initial}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MainHome"
        component={BottomRoute}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ title: 'Cadastrar_Criancas', headerShown: false }}
      />
      <Stack.Screen
        name="RegisterMotorista"
        component={RegisterMotorista}
        options={{ title: 'Criancas', headerShown: false }}
      />
      <Stack.Screen
        name="RegisterCrianca"
        component={RegisterCrianca}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ExibirCrianca"
        component={ExibirCriancas}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MainAccount"
        component={BottomRoute}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MainSearch"
        component={BottomRoute}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PerfilSearch"
        component={PerfilSearch}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MainChat"
        component={BottomRoute}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Message"
        component={Message}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Accessibility"
        component={Accessibility}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="YourAccount"
        component={YourAccount}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Language"
        component={Language}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Theme"
        component={Theme}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UpdatePassword"
        component={UpdatePassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditEmail"
        component={EditEmail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditName"
        component={EditName}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditPhone"
        component={EditPhone}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditEnd"
        component={EditEnd}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegistroRota"
        component={RegistroRota}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ExibirRota"
        component={ExibirRotas}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RotaMap"
        component={RotaMap}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Vagas"
        component={Vagas}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}
