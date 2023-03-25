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

// @ts-expect-error
import PlaidLink from '@burstware/expo-plaid-link'


import MainContainer from "../components/Container/MainContainer";

const Plaid = () => {
    //const [isLoading, setLoading] = React.useState(true);
    const [linkToken, setLinkToken] = React.useState<string | 'null'>("linkToken");

    useEffect(() => {
        getLinkToken();
    }, [])

    const getLinkToken = () => {
        axios
            .get(`${Constants.manifest!.extra!.backendUri}/api/v0/plaid/link-token/create`, {
            })
            .then((response) => {
                //console.log(response.data.data)
                setLinkToken(response.data.data.link_token)
            })
            .catch((err) => console.log(err.response.data));
    }


    console.log(linkToken);


    return (
        
        <MainContainer>
            
            <PlaidLink
            linkToken={linkToken}
            onEvent={console.log("event")}
            onExit={console.log("exit")}
            onSuccess={console.log("success.publicToken")}
            onError={console.log("error")}
             />
        </MainContainer>
    );
};

export default Plaid;
