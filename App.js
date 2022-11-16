import 'react-native-gesture-handler';
import NewPostScreen from "./screens/NewPostScreen";
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigation from './AuthNavigation';


export default function App() {
  return (
      <NavigationContainer>
        <AuthNavigation />
      </NavigationContainer>
  );
}
