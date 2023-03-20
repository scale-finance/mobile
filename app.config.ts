import "dotenv/config";

export default {
    expo: {
        name: "scale-mobile",
        slug: "scale-mobile",
        version: "1.0.0",
        orientation: "portrait",
        icon: "./assets/icon.png",
        userInterfaceStyle: "light",
        splash: {
            image: "./assets/splash.png",
            resizeMode: "contain",
            backgroundColor: "#ffffff",
        },
        extra: {
            backendUri: `http:${process.env.BACKEND_HOST}:8080`,
        },
        updates: {
            fallbackToCacheTimeout: 0,
        },
        assetBundlePatterns: ["**/*"],
        ios: {
            supportsTablet: true,
        },
        android: {
            adaptiveIcon: {
                foregroundImage: "./assets/adaptive-icon.png",
                backgroundColor: "#FFFFFF",
            },
        },
        web: {
            favicon: "./assets/favicon.png",
        },
    },
};
