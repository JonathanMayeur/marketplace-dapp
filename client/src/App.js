import React, { Component } from "react";
import MarketplaceContract from "./contracts/Marketplace.json";
import getWeb3 from "./utils/getWeb3";

import "./App.css";
import $ from 'jquery';
import HeaderBar from "./components/HeaderBar.js";
import AccountInfoBar from "./components/AccountInfoBar.js";
import { Row, Col } from 'reactstrap';
import EventInfo from "./components/EventInfo.js";
import OwnerOnly from "./components/OwnerOnly.js";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null, network: null, userType: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = MarketplaceContract.networks[networkId];
      const instance = new web3.eth.Contract(
        MarketplaceContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.getUserType);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  async testExample(data) {
    const { accounts, contract } = this.state;
    await contract.methods.set(data).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();
    // Update react state with the result.
    this.setState({ storageValue: response });
  };

  logEvent() {
    $('#events').append('<li>testing</li>');
  };

  async setAdmin() {
    const { accounts, contract } = this.state;
    const _input = $('#newAdminAddress').val();

    console.log(this.state.web3.utils.isAddress(_input));

    if(this.state.web3.utils.isAddress(_input)){
      const resp = await contract.methods.addAdmin(_input).send({ from: accounts[0] });
      console.log(resp);
    }
  };

  getUserType = async () => {
    const { accounts, contract } = this.state;

    const isAdmin = await contract.methods.admins(accounts[0]).call();
    var isOwner = false;
    const owner = await contract.methods.owner().call();
    if (owner === accounts[0]) {
      isOwner = true;
    }

    if (isOwner) {
      this.setState({ userType: "owner" })
    } else if (isAdmin) {
      this.setState({ userType: "admin" })
    } else {
      this.setState({ userType: "client" })
    }
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <HeaderBar title={"Marketplace-dapp"} address={this.state.accounts[0]} />
        <div>
          <Row>
            <Col>
              <OwnerOnly isOwner={this.state.userType} onClickAdd={() => this.setAdmin()}/>
              <h2>Smart Contract Example</h2>
              <div>The stored value is: {this.state.storageValue}</div>
            </Col>
            <Col lg="3">
              <AccountInfoBar onClick1={() => this.testExample(30)} onClick2={() => this.logEvent()} userType={this.state.userType} />
              <EventInfo />
            </Col>
          </Row>
        </div>


      </div>
    );
  }
}

export default App;
