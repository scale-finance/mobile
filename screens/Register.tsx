import axios from "axios";
import Constants from "expo-constants";
import React from "react";
import { View, Text, Pressable, Image } from "react-native";

import CustomButton from "../components/Buttons/CustomButton";
import KeyboardAvoidWrapper from "../components/Container/KeyboardAvoidWrapper";
import MainContainer from "../components/Container/MainContainer";
import CustomTextInput from "../components/InputText/CustomTextInput";

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from './RootStackParams';

type registerScreenProp = StackNavigationProp<RootStackParamList, 'Register'>;


const Register = () => {
    const [username, setUsername] = React.useState<string | null>(null);
    const [password, setPassword] = React.useState<string | null>(null);
    const [fullname, setFullname] = React.useState<string | null>(null);

    const createNewUser = () => {
        axios
            .post(`${Constants.manifest!.extra!.backendUri}/api/auth/register`, {
                email: username,
                password: password,
                fullName: fullname,
            })
            .then((response) => {
                if(response.data.status == 201){
                    navigation.navigate('Dashboard');
                };
                // TODO: 
                //else {display error message in a window}
            })
            .catch((err) => console.log(err.response.data));
        console.log("debugger");
    };

    const onUsernameChange = (username: string) => {
        setUsername(username);
    };

    const onPasswordChange = (password: string) => {
        setPassword(password);
    };

    const onFullnameChange = (fullname: string) => {
        setFullname(fullname);
    };

    const navigation = useNavigation<registerScreenProp>();

    return (
        <MainContainer>
            <KeyboardAvoidWrapper>
                <View className="flex flex-row items-center justify-center gap-0 pt-[15%]">
                    <Image source={require("../assets/scale_logo.png")} />
                </View>
                <View className="flex flex-1 justify-center items-center pt-[7%] px-[25px]">
                    <Text className="text-3xl text-[#EFE3C8] text-md">Welcome to Scale</Text>
                    <View className="h-[30px] w-full" />

                    <CustomTextInput
                        onChangeText={onFullnameChange}
                        label="Full Name"
                        placeholder="Enter your full name"
                    />

                    <CustomTextInput
                        onChangeText={onUsernameChange}
                        label="Email"
                        keyboardType="email-address"
                        placeholder="Enter your email"
                    />
                    <CustomTextInput
                        onChangeText={onPasswordChange}
                        label="Password"
                        IsSecureText
                        placeholder="* * * * * * * *"
                    />

                    <CustomTextInput
                        onChangeText={onPasswordChange}
                        label="Confirm Password"
                        IsSecureText
                        placeholder="* * * * * * * *"
                    />
                    <CustomButton
                        buttonText="Register"
                        buttonClassNames="w-full rounded-md p-3 bg-[#FB5353] flex justify-center items-center mt-5"
                        textClassNames="text-[#EFE3C8] text-[18px] font-semibold"
                        onPress={() => createNewUser()}
                    />

                    <View className="flex w-full justify-end items-end pt-4">
                        <Pressable onPress={() => navigation.navigate('Login')}>
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
