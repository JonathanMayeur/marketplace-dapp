pragma solidity ^0.5.0;

import "./Ownable.sol";

contract Marketplace is Ownable{

    //
    // State variables
    //
    mapping (address => bool) public admins;

    //
    // Events
    //
    event EditAdmin(address admin, string action);

    //
    // Functions
    //

    //
    // Owner only functions
    //

    /** @dev Add an administrator address.
      * @param newAdmin Address of new admin.
      * @return True if address is an admin.
      */
    function addAdmin(address newAdmin) public onlyOwner returns(bool) {
        admins[newAdmin] = true;
        emit EditAdmin(newAdmin, "Added admin");
        return admins[newAdmin];
    }

    /**@dev Disable an administrator address
       @param adminAddress Address of admin
       @return False if address is no longer admin
     */
    function disableAdmin(address adminAddress) public onlyOwner returns(bool) {
        admins[adminAddress] = false;
        emit EditAdmin(adminAddress, "Disabled admin");
        return admins[adminAddress];
    }


    // -----------------------------------------------------------------
    // Test code
    uint storedData;
    function set(uint x) public {
        storedData = x;
    }
    function get() public view returns (uint) {
        return storedData;
    }
}