// day la phan navigation
import {createStackNavigator} from '@react-navigation/stack';
import  {NavigationContainer} from '@react-navigation/native'
const Stack = createStackNavigator();



import Screen from './pages/Screen'
import ProductDetail from './pages/ProductDetail'


import {View, StyleSheet} from 'react-native'
import { Provider } from 'react-redux';
import store from './store/store';


export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <View style={styles.container}>
          <Stack.Navigator initialName="Home">
            <Stack.Screen name="Home" component={Screen} options={{ headerShown: false }} />
            <Stack.Screen name="ProductDetail" component={ProductDetail} />
          </Stack.Navigator>
        </View >
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 5,
  },
});
