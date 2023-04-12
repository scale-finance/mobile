import axios from "axios";
import Constants from "expo-constants";
import React, { useEffect } from "react";

import PlaidLink from "./PlaidLink";

import MainContainer from "../components/Container/MainContainer";

const Plaid = () => {
    const [linkToken, setLinkToken] = React.useState<string | "null">("linkToken");

    useEffect(() => {
        getLinkToken();
    }, []);

    const getLinkToken = () => {
        axios
            .get(`${Constants.manifest!.extra!.backendUri}/api/v0/plaid/link-token/create`, {})
            .then((response) => {
                //console.log(response.data.data)
                setLinkToken(response.data.data.link_token);
            })
            .catch((err) => console.log(err.response.data));
    };

    const exchangePublicToken = (publicToken: string) => {
        axios
            .post(`${Constants.manifest!.extra!.backendUri}/api/v0/plaid/exchange-token`, {
                publicToken,
            })
            .then((response) => {
                console.log(response.data.data);
            })
            .catch((err) => console.log(err.response.data));
    };

    return (
        <MainContainer>
            <PlaidLink
                linkToken={linkToken}
                onEvent={console.log("event")}
                onExit={console.log("exit")}
                onSuccess={(success: any) => exchangePublicToken(success.publicToken)}
                onError={console.log("error")}
            />
        </MainContainer>
    );
};

export default Plaid;
