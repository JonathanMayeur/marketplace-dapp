# Marketplace-dapp
Final project ConsenSys course 2018. [react-truffle-box](https://github.com/truffle-box/react-box) was used as a starter template. 

## What does the project do


## Installation

First ensure you are in a the project directory.

1. Run the development console.
    ```javascript
    truffle develop
    ```

2. Compile and migrate the smart contracts. Note inside the development console we don't preface commands with `truffle`.
    ```javascript
    compile
    migrate
    ```

3. In the `client` directory, we run the React app. 
    ```javascript
    // in another terminal (i.e. not in the truffle develop prompt)
    cd client
    npm run start
    ```

4. Truffle can run tests against your smart contracts.
    ```javascript
    // inside the development console.
    test

    // outside the development console..
    truffle test
    ```

5. Jest is included for testing React components. Compile your contracts before running Jest, or you may receive some file not found errors.
    ```javascript
    // ensure you are inside the client directory when running this
    npm run test
    ```

## User stories
1. Owner

2. Admin

