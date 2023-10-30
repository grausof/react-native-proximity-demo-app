This is an Example App to use [**CBOR-X**](https://github.com/kriszyp/cbor-x/) and [**COSE-JS**](https://github.com/erdtman/cose-js) with [**React Native**](https://reactnative.dev) using [**nodeify**](https://github.com/tradle/rn-nodeify). Project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Install dependencies and start the Metro Server

```bash
yarn
yarn nodeify
cd ios && pod install && cd ..
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

```bash
yarn android
# Or for iOS
yarn ios

```
