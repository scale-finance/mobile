import { View, Pressable, Text } from "react-native";
import { ArrowDownLeftIcon, UserIcon, BuildingLibraryIcon } from "react-native-heroicons/solid";
import DashboardCard from "../components/Cards/DashboardCard";
import MainContainer from "../components/Container/MainContainer";

import { banksAtom, selectedAccountAtom, transactionsAtom } from "./Dashboard";
import { useAtom } from "jotai";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./RootStackParams";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

type IAccounts = StackNavigationProp<RootStackParamList, "Accounts">;

export default function Accounts() {
    const [banks] = useAtom(banksAtom);
    console.log(banks);
    const [, setSelected] = useAtom(selectedAccountAtom);
    const [transactions] = useAtom(transactionsAtom);
    const navigation = useNavigation<IAccounts>();

    const totalBalance: any = transactions?.totalBalance
        ? `$${transactions.totalBalance.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`
        : "$--.--";

    // get all the accounts from the banks
    return (
        <MainContainer>
            <ScrollView>
                <View className="h-[55px] z-20 mt-8 flex flex-row justify-between items-center px-2">
                    <View className="flex flex-row gap-4 justify-center items-center">
                        <ArrowDownLeftIcon color="white" />
                        <Text className="text-white text-xl">Accounts</Text>
                    </View>
                    <View className="w-[40px] h-[40px] bg-[#FB5353] justify-center items-center rounded-full">
                        <UserIcon color="white" />
                    </View>
                </View>
                <View className="w-full bg-[#0C080C] h-[30%] rounded-[20px] absolute" />
                <Text className="text-white mt-[20px] mb-[20px] text-2xl text-bold ml-[20px]">
                    All Accounts
                </Text>
                <View style={{ marginBottom: 20 }}>
                    <Pressable
                        onPress={() => {
                            setSelected("all");
                            navigation.navigate("Transaction");
                        }}>
                        <DashboardCard
                            cardTitle="See all transactions"
                            totalAmount={totalBalance}
                            dateText="View all transactions"
                            icon={<BuildingLibraryIcon color="#FB5353" size={60} />}
                        />
                    </Pressable>
                </View>

                {Object.keys(banks)?.map((bank: any) => {
                    return (
                        <View style={{ marginBottom: 20 }}>
                            <Text
                                className="text-white text-xl ml-[20px]"
                                style={{ fontWeight: "bold" }}>
                                {banks[bank].name}
                            </Text>
                            {Object.keys(banks[bank].accounts)?.map((account) => {
                                const balance: any = banks[bank].accounts[account].balance
                                    ? `$${banks[bank].accounts[account].balance
                                        .toFixed(2)
                                        .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`
                                    : "$--.--";

                                return (
                                    <Pressable
                                        onPress={() => {
                                            setSelected(`${bank}-${account}`);
                                            navigation.navigate("Transaction");
                                        }}>
                                        <DashboardCard
                                            cardTitle={banks[bank].accounts[account].name}
                                            totalAmount={balance}
                                            dateText="View all transactions"
                                            icon={<BuildingLibraryIcon color="#FB5353" size={60} />}
                                        />
                                    </Pressable>
                                );
                            })}
                        </View>
                    );
                })}
                {/* <CustomButton
                        buttonText="View Transactions"
                        buttonClassNames="w-full rounded-md p-3 bg-[#818181] flex justify-center items-center mt-4"
                        textClassNames="text-[#fff] text-[18px] font-semibold"
                        onPress={() => navigation.navigate("Transaction")}
                    /> */}
            </ScrollView>
        </MainContainer>
    );
}
