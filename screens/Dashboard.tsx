import React, { useEffect } from "react";
import { View, Text, Pressable } from "react-native";
import { ArrowDownLeftIcon, UserIcon, ChartBarIcon } from "react-native-heroicons/solid";

import DashboardCard from "../components/Cards/DashboardCard";
import MainContainer from "../components/Container/MainContainer";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./RootStackParams";
import { atom, useAtom } from "jotai";
import axios from "axios";
import Constants from "expo-constants";

type IDashboard = StackNavigationProp<RootStackParamList, "Dashboard">;

export const selectedAccountAtom = atom<string | null>(null);
export const banksAtom = atom<any>(null);
export const transactionsAtom = atom<any>(null);

const Dashboard = () => {
    const [user] = React.useState<string | null>("User");
    const [transactions, setTransactions] = useAtom(transactionsAtom);
    const [banks, setBanks] = useAtom(banksAtom);
    const navigation = useNavigation<IDashboard>();

    console.log(transactions?.totalBalance);

    useEffect(() => {
        axios
            .get(`${Constants.manifest!.extra!.backendUri}/api/v0/plaid/transactions/all`)
            .then((response) => {
                // format number to currency without using Intl
                setTransactions(response.data.data);
            })
            .catch((err) => console.log(err.response.data));

        axios
            .get(`${Constants.manifest!.extra!.backendUri}/api/v0/plaid/transactions/accounts`)
            .then((response) => {
                setBanks(response.data.data.accountsData);
            })
            .catch((err) => console.log(err.response.data));
    }, []);

    const balance = transactions?.totalBalance
        ? `$${transactions?.totalBalance.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`
        : "$--.--";

    return (
        <MainContainer>
            <View className="h-[55px] z-20 mt-8 flex flex-row justify-between items-center px-2">
                <View className="flex flex-row gap-4 justify-center items-center">
                    <ArrowDownLeftIcon color="white" />
                    <Text className="text-white text-xl">Dashboard</Text>
                </View>
                <View className="w-[40px] h-[40px] bg-[#FB5353] justify-center items-center rounded-full">
                    <Pressable
                        onPress={() => {
                            navigation.navigate("Login");
                            axios.get(`${Constants.manifest!.extra!.backendUri}/api/auth/logout`);
                        }}>
                        <UserIcon color="white" />
                    </Pressable>
                </View>
            </View>
            <View className="w-full bg-[#0C080C] h-[30%] rounded-[20px] absolute" />
            <Text className="text-white mt-[20px] mb-[20px] text-2xl text-bold ml-[20px]">
                Welcome, {user}
            </Text>
            <Pressable onPress={() => navigation.navigate("Accounts")}>
                <DashboardCard
                    cardTitle="Account Balance"
                    totalAmount={balance}
                    dateText="View all transactions"
                    icon={<ChartBarIcon color="#FB5353" size={60} />}
                />
            </Pressable>
            {/* <CustomButton
                buttonText="View Transactions"
                buttonClassNames="w-full rounded-md p-3 bg-[#818181] flex justify-center items-center mt-4"
                textClassNames="text-[#fff] text-[18px] font-semibold"
                onPress={() => navigation.navigate("Transaction")}
            /> */}
        </MainContainer>
    );
};

export default Dashboard;
