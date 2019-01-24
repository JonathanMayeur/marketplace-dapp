# Marketplace-dapp
Final project ConsenSys course 2018. [react-truffle-box](https://github.com/truffle-box/react-box) was used as a starter template. 

## What does the project do?
This project is an online marketplace that operates on the blockchain. The marketplace is managed by a group of admins, that can manage store owners. Store owners can put articles for sale and manage their articles. Clients can visit the marketplace and purchase these articles for sale using cryptocurrency.

## How to set it up

First ensure you are in a the project directory.

1. Start your locally running test blockchain.
    ```javascript
    ganache-cli
    ```

2. Compile and migrate the smart contracts to the test blockchain on port 8545.
    ```javascript
    truffle compile
    truffle migrate
    ```

3. In the `client` directory, we run the React app.
    ```javascript
    npm run start
    ```
Connect MetaMask to your private blockchain and use it to sign transactions.

4. To run tests against your smart contracts.
    ```javascript
    truffle test
    ```

## User stories
1. **Owner**
The Owner of the contract opens the web app. The web app reads the address and identifies that the user is the owner, showing the user owner only functions. These are adding an address as admin, disabling an address as admin and checking if the address has admin rights.

2. **Admin**
An admin opens the web app. The web app identifies that the user is an admin. This by reading the address and showing admin only functions. These functions include adding and disabling addresses as storeOwners. All the addresses that have or are identified as storeOwner are shown.

3. **StoreOwner**
A storeOwner opens the web app. The storeOwner can add an article for sale. Disable one of it's article for sale and see the balance made from sales. It can withdraw that balance into it's account. 

4. **Client**
A user not identified as Owner, Admin or StoreOwner is a client. The client can see all the articles for sale and buy an article.

