const Marketplace = artifacts.require("./Marketplace.sol");

contract("Marketplace", accounts => {
    var MarketplaceInstance;

//   it("should add and disable admins.", async () => {
//     const MarketplaceInstance = await Marketplace.deployed();

//     await MarketplaceInstance.addAdmin(accounts[1]);
//     const isAdmin = await MarketplaceInstance.admins(accounts[1]);

//     assert.equal(isAdmin, true, "The address was not added as admin.");
//   });

  it("should add and disable admin addresses", function(){
    return Marketplace.deployed().then(function(instance){
        MarketplaceInstance = instance;
        MarketplaceInstance.addAdmin(accounts[1]);
        return MarketplaceInstance.admins(accounts[1]);
    }).then(function(isAdmin){
        assert.isTrue(isAdmin, "The addres was not set as admin.");
    }).then(function(){
        MarketplaceInstance.disableAdmin(accounts[1]);
        return MarketplaceInstance.admins(accounts[1]);
    }).then(function(isAdmin){
        assert.isFalse(isAdmin, "The admin addres was not disabled.");
     });
    //.then(function(){
    //     assert.revert(MarketplaceInstance.addAdmin(accounts[1], {from: accounts[2]}), "fail");
    // });
});


});
