import axios from "axios";
import Constants from "expo-constants";
import React, { useState, useEffect } from 'react'
import { View, Text, Dimensions } from "react-native";
import {
    ArrowDownLeftIcon,
    UserIcon,
    ChartBarIcon,
    ChartPieIcon,
} from "react-native-heroicons/solid";

import { PlaidLink, LinkSuccess, LinkExit } from 'react-native-plaid-link-sdk'
//import { Modal } from '../layout'

import MainContainer from "../components/Container/MainContainer";

const Plaid = () => {
    const [linkToken, setLinkToken] = React.useState<string | "null">("");

    useEffect(() => {
       connectToPlaid()
    }, []);

    const connectToPlaid = () => {
        axios
            .get(`${Constants.manifest!.extra!.backendUri}/api/v0/plaid/link-token/create`, {
            })
            .then((response) => {
                console.log(response.data.data);
                setLinkToken(response.data.data.linkToken);
            }) 
            .catch((err) => console.log(err.response.data));
            console.log("debugger2");
    }
            
    return (
        <MainContainer>
            
                <PlaidLink
                    tokenConfig={{token: linkToken, noLoadingState: false }}
                    onSuccess={(success: LinkSuccess) => console.log(success)}
                    onExit={(exit: LinkExit) => console.log(exit)}
                >
                <Text>Click me to open Plaid</Text>
                </PlaidLink>
           
        </MainContainer>
    );
};

export default Plaid;
