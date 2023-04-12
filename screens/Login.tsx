import axios from "axios";
import React from "react";
import Constants from "expo-constants";
import { View, Text, Pressable, Image } from "react-native";
import { AtSymbolIcon, LockClosedIcon } from "react-native-heroicons/solid";

import CustomButton from "../components/Buttons/CustomButton";
import KeyboardAvoidWrapper from "../components/Container/KeyboardAvoidWrapper";
import MainContainer from "../components/Container/MainContainer";
import CustomTextInput from "../components/InputText/CustomTextInput";

import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./RootStackParams";
import { useAuthenticationEnforcement } from "../util/checkAuth";

type loginScreenProp = StackNavigationProp<RootStackParamList, "Login">;

const Login = () => {
    const [email, setEMail] = React.useState<string | null>(null);
    const [password, setPassword] = React.useState<string | null>(null);

    const authenticateUser = () => {
        axios
            .post(`${Constants.manifest!.extra!.backendUri}/api/auth/login`, {
                email,
                password,
            })
            .then((response) => {
                if (response.data.status === 200) {
                    navigation.navigate("Dashboard");
                }
                // TODO:
                //else {display error message in a window}
            })
            .catch((err) => console.log(err.response.data));
        console.log("debugger");
    };

    const onUsernameChange = (email: string) => {
        setEMail(email);
    };

    const onPasswordChange = (password: string) => {
        setPassword(password);
    };

    const navigation = useNavigation<loginScreenProp>();
    useAuthenticationEnforcement(navigation);

    return (
        <MainContainer>
            <KeyboardAvoidWrapper>
                <View className="flex flex-row items-center justify-center gap-0 pt-[25%]">
                    <Image source={require("../assets/scale_logo.png")} />
                    {/* <Text className="text-5xl text-[#EFE3C8] font-mono">Scale</Text>  */}
                </View>
                <View className="flex flex-1 justify-center items-center pt-[10%] px-[25px]">
                    <Text className="text-3xl text-[#EFE3C8] text-md">Welcome to Scale</Text>
                    <Text className="text-1xl text-[#EFE3C8] text-md pt-[5%]">New here?</Text>
                    <Pressable onPress={() => navigation.navigate("Register")}>
                        <Text className="text-1xl text-[#FB5353] text-md pb-[5%]">
                            Register here
                        </Text>
                    </Pressable>
                    <View className="h-45px] w-full" />
                    <CustomTextInput
                        icon={<AtSymbolIcon color="#979797" width={35} height={35} />}
                        onChangeText={onUsernameChange}
                        label="Email"
                        keyboardType="email-address"
                        placeholder="Enter your email"
                    />
                    <CustomTextInput
                        icon={<LockClosedIcon color="#979797" width={35} height={35} />}
                        onChangeText={onPasswordChange}
                        label="Password"
                        IsSecureText
                        keyboardType="default"
                        placeholder="Enter your password"
                    />
                    <CustomButton
                        buttonText="Login"
                        buttonClassNames="w-full rounded-md p-3 bg-[#FB5353] flex justify-center items-center mt-5"
                        textClassNames="text-[#EFE3C8] text-[18px] font-semibold"
                        onPress={() => authenticateUser()}
                    />
                    {/** 
          <CustomButton
            buttonText="Register"
            buttonClassNames="w-full rounded-md p-3 bg-transparent flex justify-center items-center mt-3 border-[1px] border-[#EFE3C8] border-solid"
            textClassNames="text-[#EFE3C8] text-[18px] font-semibold"
            onPress={() => console.log(password)}
          />
          */}
                    <View className="flex w-full justify-end items-end pt-4">
                        <Pressable onPress={() => console.log("pressed forgot password")}>
                            <Text className="text-center text-gray-500 text-sm">
                                Forgot your password?
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </KeyboardAvoidWrapper>
        </MainContainer>
    );
};

export default Login;
