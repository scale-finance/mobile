import { StatusBar } from "expo-status-bar";
import Login from "./screens/Login";
import React from "react";
import { TailwindProvider } from "tailwindcss-react-native";
import Register from "./screens/Register";

const App: React.FC = () => {
  return (
    <>
      <TailwindProvider>
        {/* TailwindProvider */}
        <StatusBar style="light" />
        <Register />
      </TailwindProvider>
    </>
  );
};

export default App;
