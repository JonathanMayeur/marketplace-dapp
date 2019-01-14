## Design pattern desicions
The design patterns used in this project are:
1. **Circuit breaker**
The pattern adds an option to disable critical contract functionality in case of an emergency. This pattern is used to prepare for potential failures. If the contract is currently stopped or not is stored in a state variable in the form of a Boolean, which is initialized as false during contract creation. In case the state variable indicates that emergency stop has been triggered, the function modifiers will throw an exception.
```Solidity
    bool isStopped = false;

    modifier stoppedInEmergency {
        require(!isStopped);
        _;
    }
```

2. **Contract self destruction**

3. **Acces restriction**
This restricts who can make modifications to the contract’s state or call the contract’s functions. The use of function modifiers makes these restrictions highly readable. The modifiers onlyOwner, onlyAdmin and onlyStoreOwner are used. 
```Solidity
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

