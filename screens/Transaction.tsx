import React, { useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { ArrowDownLeftIcon, UserIcon } from "react-native-heroicons/solid";

import MainContainer from "../components/Container/MainContainer";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./RootStackParams";
import { useAtom } from "jotai";
import { banksAtom, selectedAccountAtom, transactionsAtom } from "./Dashboard";

type IDashboard = StackNavigationProp<RootStackParamList, "Dashboard">;

const Transaction = () => {
    const [banks] = useAtom(banksAtom);
    const [selectedAccount] = useAtom(selectedAccountAtom);
    const [transactions] = useAtom(transactionsAtom);

    let accountData;

    if (selectedAccount !== "all") {
        const [bank, account] = selectedAccount!.split("-");
        console.log(selectedAccount, bank, account);
        accountData = banks[bank].accounts[account];
    } else {
        accountData = transactions;
    }

    const balanceNum = accountData?.totalBalance ?? accountData.balance;

    const balance = balanceNum
        ? `$${balanceNum.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`
        : "$--.--";

    const accountName = accountData?.name ?? "All Accounts";

    const renderItem = ({ item }: { item: any }) => {
        return (
            <View style={styles.itemContainer}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        width: "40%",
                        paddingLeft: 20,
                    }}>
                    <View>
                        <Text style={styles.fontStyle}>Merchant</Text>
                        <Text style={styles.text}>{item.merchant_name ?? "Unknown"}</Text>
                    </View>
                </View>
                <View style={styles.textView}>
                    <Text style={styles.fontStyle}>Payment Mode</Text>
                    <Text style={styles.text}>{item.payment_channel}</Text>
                </View>
                <View
                    style={{
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "flex-end",
                        width: "30%",
                    }}>
                    <Text style={styles.fontStyle}>Amount</Text>
                    <Text style={styles.text}>{item.amount}</Text>
                </View>
            </View>
        );
    };

    return (
        <MainContainer>
            <View className="h-[55px] z-20 mt-8 flex flex-row justify-between items-center px-2">
                <View className="flex flex-row gap-4 justify-center items-center">
                    <ArrowDownLeftIcon color="white" />
                    <Text className="text-white text-xl">Transaction</Text>
                </View>
                <View className="w-[40px] h-[40px] bg-[#FB5353] justify-center items-center rounded-full">
                    <UserIcon color="white" />
                </View>
            </View>
            <View className="w-full bg-[#0C080C] h-[30%] rounded-[20px] absolute" />
            <Text className="text-white mt-[20px] mb-[20px] text-2xl text-bold ml-[20px]">
                {accountName} - {balance}
            </Text>

            <View style={{ marginTop: 10 }}>
                <FlatList
                    data={accountData.transactions}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => `${item?.account_id}-${index}`}
                    maxToRenderPerBatch={5}
                    initialNumToRender={10}
                    style={{ paddingTop: 10 }}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </MainContainer>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: "row",
        marginVertical: 5,
        backgroundColor: "#818181",
        borderRadius: 10,
        height: 100,
    },
    textView: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: "#fff",
        fontSize: 20,
    },
    icon: {
        width: 20,
        height: 20,
        marginBottom: 5,
    },

    fontStyle: {
        color: "#EFE3C8",
        fontSize: 12,
    },
});

export default Transaction;
