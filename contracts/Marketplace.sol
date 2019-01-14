pragma solidity ^0.5.0;

import "./Ownable.sol";

contract Marketplace is Ownable{

    //
    // State variables
    //
    mapping (address => bool) public admins;

    uint256 storeOwnersCounter;
    struct StoreOwner {
        uint id;
        address storeOwnerAddress;
        uint256 balance;
        bool enrolled;
    }
    mapping (uint => StoreOwner) public storeOwners;
    mapping (address => uint) public storeOwnersIds;

    //
    // Modifiers
    // 
    modifier onlyAdmin(){
        require(admins[msg.sender] == true);
        _;
    }

    //
    // Events
    //
    event EditAdmin(address admin, string action);
    event EditStoreOwner(address storeOwner, string action);

    //
    // Functions
    //

    /////////////////////////////////////////////////////
    // Owner only functions                            
    /////////////////////////////////////////////////////

    /** @dev Add an administrator address.
      * @param newAdmin Address of new admin.
      * @return True if address is an admin.
      */
    function addAdmin(address newAdmin) public onlyOwner returns(bool) {
        admins[newAdmin] = true;
        emit EditAdmin(newAdmin, "Added admin");
        return admins[newAdmin];
    }

    /** @dev Disable an administrator address
      * @param adminAddress Address of admin
      * @return False if address is no longer admin
      */
    function disableAdmin(address adminAddress) public onlyOwner returns(bool) {
        admins[adminAddress] = false;
        emit EditAdmin(adminAddress, "Disabled admin");
        return admins[adminAddress];
    }


    /////////////////////////////////////////////////////
    // Admin only functions
    /////////////////////////////////////////////////////

    /** @dev Add an storeOwner address.
      * @param newStoreOwner Address of new storeOwner.
      * @return True if address is a storeOwner.
      */
    function addStoreOwner(address newStoreOwner) public onlyAdmin returns(bool){
        require(!checkStoreOwner(newStoreOwner));
        storeOwnersCounter++;
        storeOwners[storeOwnersCounter] = StoreOwner(storeOwnersCounter,newStoreOwner, 0, true);
        storeOwnersIds[newStoreOwner] = storeOwnersCounter;
        emit EditStoreOwner(newStoreOwner, "Added new storeOwner.");
        return storeOwners[storeOwnersCounter].enrolled;
    }

    /** @dev change enrolled status of a storeOwner address
      * @param storeOwnerAddress Address of storeOwner
      * @return False if address is no longer storeOwner
      */
    function changeStatusEnrolledStoreOwner(address storeOwnerAddress) public onlyAdmin returns(bool) {
        uint _id = storeOwnersIds[storeOwnerAddress];
        storeOwners[_id].enrolled = !storeOwners[_id].enrolled;
        emit EditStoreOwner(storeOwnerAddress, "Changed enrolled status storeOwner.");
        return storeOwners[storeOwnersCounter].enrolled;
    }  

    /** @dev check if address is storeOwner
      * @param storeOwnerAddress Address of storeOwner
      * @return True if address is a storeOwner
      */
    function checkStoreOwner(address storeOwnerAddress) public view returns(bool) {
        uint _id = storeOwnersIds[storeOwnerAddress];
        return storeOwners[_id].enrolled;
    }

    /** @dev Get number of storeOwners
      * @return storeOwnersCounter;
      */
    function getNumberOfStoreOwners() public view returns(uint){
        return storeOwnersCounter;
    }

    /////////////////////////////////////////////////////
    // StoreOwner only functions
    /////////////////////////////////////////////////////    

}