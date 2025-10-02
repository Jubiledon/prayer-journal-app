import HomeScreen from "../screens/HomeScreen";
import AnsweredScreen from "../screens/AnsweredScreen";
import AddPrayer from "../screens/AddPrayer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export default function Index() {
  return (
      <Tab.Navigator initialRouteName="Prayers">
        <Tab.Screen name="Prayers" component={HomeScreen} />
        <Tab.Screen name="Answered" component={AnsweredScreen} />
        <Tab.Screen name="AddPrayer" component={AddPrayer} options={{ title: 'Add Prayer' }} />
      </Tab.Navigator>
  );
}
