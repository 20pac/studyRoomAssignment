import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import HomeScreen from './screens/HomeScreen';
import GifDetailsScreen from './screens/GifDetailsScreen';
import {Gif} from './models/Models';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text, View} from 'react-native';
import HistoryScreen from './screens/HistoryScreen';

const Stack = createStackNavigator();

export type RootStackParamList = {
  Home: undefined;
  Details: Gif;
  History: undefined;
};

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({navigation, route}) => ({
            headerTitle: props => (
              <View
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                  paddingHorizontal: 20,
                }}>
                <Text style={{fontSize: 21, fontWeight: '700'}}>Home</Text>

                <Icon
                  name="history"
                  size={30}
                  color="black"
                  onPress={() => navigation.navigate('History')}
                />
              </View>
            ),
          })}
        />
        <Stack.Screen name="Details" component={GifDetailsScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
