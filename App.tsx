import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import Dashboard from "./screens/Dashboard";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Plaid from "./screens/Plaid";
import Transaction from "./screens/Transaction";
import React from "react";
import { TailwindProvider } from "tailwindcss-react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import { RootStackParamList } from "./screens/RootStackParams";
import Accounts from "./screens/Accounts";

const Stack = createStackNavigator<RootStackParamList>();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Group>
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen
                    name="Dashboard"
                    component={Dashboard}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="Plaid" component={Plaid} options={{ headerShown: false }} />
                <Stack.Screen
                    name="Transaction"
                    component={Transaction}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Accounts"
                    component={Accounts}
                    options={{ headerShown: false }}
                />
            </Stack.Group>
            <Stack.Group
                screenOptions={{
                    cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
                    headerShown: false,
                }}>
                <Stack.Screen name="Register" component={Register} />
            </Stack.Group>
        </Stack.Navigator>
    );
}

const App: React.FC = () => {
    return (
        <NavigationContainer>
            <TailwindProvider>
                {/* TailwindProvider */}
                <StatusBar style="light" />
                <MyStack />
            </TailwindProvider>
        </NavigationContainer>
    );
};

export default App;
