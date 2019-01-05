import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./utils/getWeb3";

import "./App.css";
import HeaderBar from "./components/HeaderBar.js";
import AccountInfoBar from "./components/AccountInfoBar.js";
import { Row, Col } from 'reactstrap';

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null, network: null};

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance}, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  async testExample(data){
    const { accounts, contract } = this.state;
    await contract.methods.set(data).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();
    // Update react state with the result.
    this.setState({ storageValue: response });
  }

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();

    // Update react state with the result.
    this.setState({ storageValue: response });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <HeaderBar title={"Marketplace-dapp"} address={this.state.accounts[0]} accountType={"client"} />
        <div>
          <Row>
            <Col><h2>Smart Contract Example</h2>
              <p>
                If your contracts compiled and migrated successfully, below will show
                a stored value of 5 (by default).
              </p>
              <p>
                Try changing the value stored on <strong>line 40</strong> of App.js.
              </p>
              <div>The stored value is: {this.state.storageValue}</div></Col>
            <Col lg="3">
              <AccountInfoBar onClick1={() => this.testExample(30)} network="..." />
            </Col>
          </Row>
        </div>


      </div>
    );
  }
}

export default App;
