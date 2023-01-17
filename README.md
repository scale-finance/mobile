# Welcome to Scale Mobile

This is the main frontend repo containing all of the mobile-handled code. Everything
here will be able to run on both IOS and Android, but for our purposes, we will mainly
be running it through Expo.

## Setting up the Repo locally

If you are setting up the repo for the first time, just follow these steps and you should be good to go!

1. Using your terminal, go to a directory where you want to keep repo
2. Once there, clone the repo using:
    ```cmd
    git clone https://github.com/scale-finance/mobile.git`
    ```
3. To install dependencies, just use the following command:
    ```cmd
    npm install
    ```
4. To start application, you may use the command:
    ```cmd
    npm start
    ```
5. Once the app is running, you will be shown a QR code, here you may need to install the **Expo Go** mobile application and use the Camera or App to scan the code and open the app.
    > **Note:** Ensure that your computer and your phone are using the same network to establish connection, another way you can do this is by making a hotspot on your computer and connecting to it on your phone.
6. If you followed all the steps, you should be ready to go!

## Setting up linting

For this project, we want to lint all of our code when necessary, this to ensure that all the code in our project is nice and uniform. To make your life easier when following these standards, you should follow these steps:

1. Go to the **Plugins** section in VS Code
2. Go the search on the left hand corner and search and install the following:
   a. `dbaeumer.vscode-eslint`: This is ESLint, it will give you live validation of coding standards
   b. `esbenp.prettier-vscode`: This is Prettier, the main formatter we will be using for this project
3. After installing these plugins you will now get warned whenever your code doesn't follow the standards!

To quickly format your code without much effort, I highly recommend memorizing this macro: `ALT + SHIFT + F`. This shortcut will automatically format any code using Prettier!
