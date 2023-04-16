import React, { useEffect } from "react";
import {View, Text, FlatList, StyleSheet, Image} from 'react-native';
import {
    ArrowDownLeftIcon,
    UserIcon,
    ChartBarIcon,
    ChartPieIcon,
} from "react-native-heroicons/solid";

import DashboardCard from "../components/Cards/DashboardCard";
import MainContainer from "../components/Container/MainContainer";
import CustomButton from "../components/Buttons/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./RootStackParams";
import axios from "axios";
import Constants from "expo-constants";

type IDashboard = StackNavigationProp<RootStackParamList, "Dashboard">;

const Dashboard = () => {
    const [user] = React.useState<string | null>("User");
    const [balance, setBalance] = React.useState<string | null>(null);
    const navigation = useNavigation<IDashboard>();

    useEffect(() => {
        axios
            .get(`${Constants.manifest!.extra!.backendUri}/api/v0/plaid/transactions/all`)
            .then((response) => {
                // format number to currency without using Intl
                setBalance(
                    `$${response.data.data.totalBalance
                        .toFixed(2)
                        .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`
                );
            })
            .catch((err) => console.log(err.response.data));
    });

    return (
        <MainContainer>
            <View className="h-[55px] z-20 mt-8 flex flex-row justify-between items-center px-2">
                <View className="flex flex-row gap-4 justify-center items-center">
                    <ArrowDownLeftIcon color="white" />
                    <Text className="text-white text-xl">Dashboard</Text>
                </View>
                <View className="w-[40px] h-[40px] bg-[#FB5353] justify-center items-center rounded-full">
                    <UserIcon color="white" />
                </View>
            </View>
            <View className="w-full bg-[#0C080C] h-[30%] rounded-[20px] absolute" />
            <Text className="text-white mt-[20px] mb-[20px] text-2xl text-bold ml-[20px]">
                Welcome, {user}
            </Text>
            <DashboardCard
                cardTitle="Account Balance"
                totalAmount={balance}
                /*dateText="02-28-2023"*/
                icon={<ChartBarIcon color="#FB5353" size={60} />}
            />
            <CustomButton
                buttonText="View Transactions"
                buttonClassNames="w-full rounded-md p-3 bg-[#818181] flex justify-center items-center mt-4"
                textClassNames="text-[#fff] text-[18px] font-semibold"
                onPress={() => navigation.navigate("Transaction")}
            />
        </MainContainer>
    );
};

export default Dashboard;
