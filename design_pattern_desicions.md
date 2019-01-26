## Design pattern desicions
The design patterns used in this project are:
1. **Circuit breaker**
The pattern adds an option to disable critical contract functionality in case of an emergency. This pattern is used to prepare for potential failures. If the contract is currently stopped or not is stored in a state variable in the form of a Boolean, which is initialized as false during contract creation. In case the state variable indicates that emergency stop has been triggered, the function modifiers will throw an exception.
```Solidity
    bool private stopped = false;

    function toggle_active() public onlyOwner {
        stopped = !stopped;
    }

    modifier stopIfEmergency(){ require(!stopped); _; }
```

2. **Contract self destruction**
Used to terminate the contract. Removing the contract forever from the blockchain.
```Solidity
    function kill() public onlyOwner{
        selfdestruct(msg.sender);
    }
```

3. **Acces restriction**
This restricts who can make modifications to the contract’s state or call the contract’s functions. The use of function modifiers makes these restrictions highly readable. The modifiers onlyOwner, onlyAdmin and onlyStoreOwner are used. 
```Solidity
    modifier onlyOwner() {
        require(isOwner());
        _;
    }

    modifier onlyAdmin(){
        require(admins[msg.sender]);
        _;
    }
    
    modifier onlyStoreOwner(){
        require(checkStoreOwner(msg.sender));
        _;
    }
```

4. **Withdrawal pattern**
Isolate each external call into its own transaction that can be initiated by the recipient of the call. This is used in this project for payments. StoreOwners withdraw their funds rather than haveing funds pushed to them automatically.
```Solidity
    function withdraw(address storeOwnerAddress) public onlyStoreOwner stopIfEmergency returns(bool){
        require(storeOwnerAddress == msg.sender);

        uint id = storeOwnersIds[storeOwnerAddress];
        uint amount = storeOwners[id].balance;

        require(amount != 0);

        storeOwners[id].balance -= amount;
        msg.sender.transfer(amount);

        return true;
    }
```

