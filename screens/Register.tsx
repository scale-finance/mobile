import { View, Text,Pressable,Image } from "react-native";
import React from "react";
import MainContainer from "../components/Container/MainContainer";
import KeyboardAvoidWrapper from "../components/Container/KeyboardAvoidWrapper";
import CustomTextInput from "../components/InputText/CustomTextInput";
import { AtSymbolIcon, LockClosedIcon } from "react-native-heroicons/solid";
import CustomButton from "../components/Buttons/CustomButton";

const Register = () => {
  const [username, setUsername] = React.useState<String | null>(null);
  const [password, setPassword] = React.useState<String | null>(null);
  const onUsernameChange = (username: String) => {
    setUsername(username);
  };
  const onPasswordChange = (password: String) => {
    setPassword(password);
  };
  return (
    <MainContainer>
      <KeyboardAvoidWrapper>
        <View className="flex flex-row items-center justify-center gap-0 pt-[15%]">
          <Image source={require('../assets/scale_logo.png')} />
        </View>
        <View className="flex flex-1 justify-center items-center pt-[7%] px-[25px]">
        <Text className="text-3xl text-[#EFE3C8] text-md">
            Welcome to Scale
        </Text>
          <View className="h-[30px] w-full"></View>

          <CustomTextInput
            onChangeText={onUsernameChange}
            label="Full Name"
            placeholder="Enter your full name"
          />

          <CustomTextInput
            onChangeText={onUsernameChange}
            label="Email"
            keyboardType={"email-address"}
            placeholder="Enter your email"
          />
          <CustomTextInput
            onChangeText={onPasswordChange}
            label="Password"
            IsSecureText={true}
            placeholder="* * * * * * * *"
          />

          <CustomTextInput
            onChangeText={onPasswordChange}
            label="Confirm Password"
            IsSecureText={true}
            placeholder="* * * * * * * *"
          />
          <CustomButton
            buttonText="Register"
            buttonClassNames="w-full rounded-md p-3 bg-[#FB5353] flex justify-center items-center mt-5"
            textClassNames="text-[#EFE3C8] text-[18px] font-semibold"
            onPress={() => console.log(password)}
          />

          <View className="flex w-full justify-end items-end pt-4">
            <Pressable onPress={() => console.log("clicked already have an account")}>
              <Text className="text-center text-gray-500 text-sm text-[#EFE3C8]">
                Already have an account? Login here
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidWrapper>
    </MainContainer>
  );
};

export default Register;