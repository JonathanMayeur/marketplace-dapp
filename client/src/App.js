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
import AdminOnly from "./components/AdminOnly.js";


class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null, network: null, userType: null, storeOwners: [] };

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

  getUserType = async () => {
    const { accounts, contract } = this.state;
  
    var isOwner = false;
    const owner = await contract.methods.owner().call();
    if (owner === accounts[0]) {
      isOwner = true;
    }
    const isAdmin = await contract.methods.admins(accounts[0]).call();
    const isStoreOwner = await contract.methods.checkStoreOwner(accounts[0]).call();


    if (isOwner) {
      this.setState({ userType: "owner" })
    } else if (isAdmin) {
      this.setState({ userType: "admin" })
      this.reloadStoreOwners();
    } else if (isStoreOwner) {
      this.setState({ userType: "storeOwner" })
    } else {
      this.setState({ userType: "client" })
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
  // $('#events').append('<li>testing</li>');


  /////////////////////////////////////////////////////
  // Owner only functions                            
  /////////////////////////////////////////////////////
  /** @dev add admin address from input field. */
  async setAdmin() {
    const { accounts, contract } = this.state;
    const _input = $('#newAdminAddress').val();
    // check if input is valid address
    if (this.state.web3.utils.isAddress(_input)) {
      await contract.methods.addAdmin(_input).send({ from: accounts[0] }).then(function () {
        $('#newAdminFormText').text("address added as admin.");
      });
    } else {
      $('#newAdminFormText').text("Invalid input.");
    }
  };

  /** @dev disable admin address from input field. */
  async disableAdmin() {
    const { accounts, contract } = this.state;
    const _input = $('#disableAdminAddress').val();
    if (this.state.web3.utils.isAddress(_input)) {
      await contract.methods.disableAdmin(_input).send({ from: accounts[0] }).then(function () {
        $('#disableAdminFormText').text("Address is no longer admin.");
      });
    } else {
      $('#disableAdminFormText').text("Invalid input.");
    }
  };

  /** @dev check if address from input field is admin. */
  async checkAdmin() {
    const { contract } = this.state;
    const _input = $('#checkAdminAddress').val();
    if (this.state.web3.utils.isAddress(_input)) {
      const resp = await contract.methods.admins(_input).call();
      $('#checkAdminFormText').text("admins() returned " + resp);
    } else {
      $('#checkAdminFormText').text("Ivalid input.");
    }
  };

  /////////////////////////////////////////////////////
  // Admin only functions                            
  /////////////////////////////////////////////////////
  /** @dev add storeOwner address from input field. */
  async setStoreOwner() {
    const { accounts, contract } = this.state;
    const _input = $('#newStoreOwnerAddress').val().trim();
    if (this.state.web3.utils.isAddress(_input)) {
      await contract.methods.addStoreOwner(_input).send({ from: accounts[0] }).then(function () {
        $('#newStoreOwnerFormText').text("address added as storeOwner.");
      }).then(()=>{
        this.reloadStoreOwners();
      });
    } else {
      $('#newStoreOwnerFormText').text("Invalid input.");
    }
  };

    /** @dev disable storeOwner address from input field. */
    async disableStoreOwner() {
      console.log("disable clicked");
      const { accounts, contract } = this.state;
      const _input = $('#disableStoreOwnerAddress').val().trim();
      if (this.state.web3.utils.isAddress(_input)) {
        await contract.methods.disableStoreOwner(_input).send({ from: accounts[0] }).then(function () {
          $('#disableStoreOwnerFormText').text("address disabled as storeOwner.");
        }).then(()=>{
          this.reloadStoreOwners();
        });
      } else {
        $('#disableStoreOwnerFormText').text("Invalid input.");
      }
    };

  async reloadStoreOwners() {
    const { contract } = this.state; 
    var _this = this;
    this.setState({storeOwners: []});

    await contract.methods.getNumberOfStoreOwners().call()
    .then((storeOwnerIds) => { 
      for(var i = 1; i<= storeOwnerIds; i++){
        contract.methods.storeOwners(i).call().then(result => {
          // temp.push({id: result[0], address: result[1], enrolled: result[3].toString()});
          _this.setState({storeOwners: [...this.state.storeOwners, {id: result[0], address: result[1], enrolled: result[3].toString()}]
          })

        });
      }
    });
  }

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
              <OwnerOnly isOwner={this.state.userType} onClickAdd={() => this.setAdmin()} onClickCheck={() => this.checkAdmin()} onClickDisable={() => this.disableAdmin()} />
              <AdminOnly isOwner={this.state.userType} onClickAdd={() => this.setStoreOwner()} onClickDisable={() => this.disableStoreOwner()} storeOwnerArray={this.state.storeOwners}/>

              <h2>Smart Contract Example</h2>
              <div>The stored value is: {this.state.storageValue}</div>
            </Col>
            <Col lg="3">
              <AccountInfoBar onClick1={() => this.testExample(30)} userType={this.state.userType} />
              <EventInfo />
            </Col>
          </Row>
        </div>


      </div>
    );
  }
}

export default App;
