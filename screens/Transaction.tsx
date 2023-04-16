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

const Transaction = () => {
    const [user] = React.useState<string | null>("User");
    const [accountNum] = React.useState<string | null>("0000");
    const [balance, setBalance] = React.useState<string | null>(null);
    const [transactionData, setTransactionData] = React.useState(null);
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
                setTransactionData( 
                    response.data.data.transactions
                );
            })
            .catch((err) => console.log(err.response.data));

    });


    const renderItem = ({item}: {item:any}) => {
        return (
          <View style={styles.itemContainer}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '40%',
              }}>
              <View>
                <Text style={styles.fontStyle}>Merchant</Text>
                <Text style={styles.text}>{item.merchant_name ?? 'Unknown'}</Text>
              </View>
            </View>
            <View style={styles.textView}>
              <Text style={styles.fontStyle}>Payment Mode</Text>
              <Text style={styles.text}>{item.payment_channel}</Text>
            </View>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-end',
                width: '30%',
              }}>
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
                Account Balance - {balance}
            </Text>
            
            <View style={{marginTop: 10}}>
            <FlatList
                data={transactionData}
                renderItem={renderItem}
                keyExtractor={(item, index) => `${item?.account_id}-${index}`}
                maxToRenderPerBatch={5}
                initialNumToRender={10}
                style={{paddingTop: 10}}
                showsVerticalScrollIndicator={false}
            />
            </View>
        </MainContainer>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
      flexDirection: 'row',
      marginVertical: 5,
      backgroundColor: '#1E1E2D',
      borderRadius: 10,
      height: 100,
    },
    textView: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: '#fff',
      fontSize: 10,
    },
    icon: {
      width: 20,
      height: 20,
      marginBottom: 5,
    },
  
    fontStyle: {
      color: '#fff',
      fontSize: 12,
    },
  });

export default Transaction;
