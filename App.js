import 'react-native-gesture-handler';
// import HomeScreen from "./screens/HomeScreen";
import NewPostScreen from "./screens/NewPostScreen";
import { NavigationContainer } from '@react-navigation/native';
import SignedInStack from './navigation'

export default function App() {
  return (
      <NavigationContainer>
        <SignedInStack />
      </NavigationContainer>
  );
}
