import axios from "axios";
import { useEffect } from "react";
import Constants from "expo-constants";

export const useAuthenticationEnforcement = (navigation: any) => {
    useEffect(() => {
        axios
            .get(`${Constants.manifest!.extra!.backendUri}/api/v0/ping`)
            .then((res) => {
                console.log(res);

                if (res.data.data.status === 200) {
                    navigation.navigate("Dashboard");
                }
            })
            .catch((err) => {
                console.error(err);
                navigation.navigate("Dashboard");
            });
    }, []);
};
