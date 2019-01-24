## Avoiding common attacks
Measures taken to ensure contract is not susceptible to common attacks.
1. **Locked pragma to specific compiler version**
Locking the pragma helps ensure that the contract does not accidentally get deployed using, for example, the latest compiler which may have higher risks of undiscovered bugs.
```Solidity
    pragma solidity 0.5.0;
```

2. **Access restriction**
Restrict the access to contract functionality according to suitable criteria. In this case according if the msg.sender is owner, admin, store owner or client.
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

3. **Check inputs**
Ensure the input parameters are as expected.
```Solidity
    require(_id > 0 && _id <= articleCounter);
    require(msg.sender != article.seller);
```



4. **Transaction protocols**
Used msg.sender as opposed to tx.origin for value transfers.
```Solidity
    msg.sender.transfer(amount);
```

5. **Pull over push payment**
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

6. **Reentrancy**
Funds transfered after balance is zeroed. Making state changes before transfering ether. If transfer fails the function will be reverted so the balance does not wrongfully get set to 0.
```Solidity
    storeOwners[id].balance -= amount;
    msg.sender.transfer(amount);
```

7. **Circuit breaker**
The pattern adds an option to disable critical contract functionality in case of an emergency. This pattern is used to prepare for potential failures. If the contract is currently stopped or not is stored in a state variable in the form of a Boolean, which is initialized as false during contract creation. In case the state variable indicates that emergency stop has been triggered, the function modifiers will throw an exception.
```Solidity
    bool private stopped = false;

    function toggle_active() public onlyOwner {
        stopped = !stopped;
    }

    modifier stopIfEmergency(){ require(!stopped); _; }
```

