const Marketplace = artifacts.require("./Marketplace.sol");

contract("Marketplace", accounts => {
    var MarketplaceInstance;

    //   it("should add and disable admins.", async () => {
    //     const MarketplaceInstance = await Marketplace.deployed();

    //     await MarketplaceInstance.addAdmin(accounts[1]);
    //     const isAdmin = await MarketplaceInstance.admins(accounts[1]);

    //     assert.equal(isAdmin, true, "The address was not added as admin.");
    //   });

    it("should add and disable admin addresses", function () {
        return Marketplace.deployed().then(function (instance) {
            MarketplaceInstance = instance;
            MarketplaceInstance.addAdmin(accounts[1]);
            return MarketplaceInstance.admins(accounts[1]);
        }).then(function (isAdmin) {
            assert.isTrue(isAdmin, "The addres was not set as admin.");
        }).then(function () {
            MarketplaceInstance.disableAdmin(accounts[1]);
            return MarketplaceInstance.admins(accounts[1]);
        }).then(function (isAdmin) {
            assert.isFalse(isAdmin, "The admin addres was not disabled.");
        });
    });

    it("should revert when calling onlyOwner function from non owner address", async function () {
        try {
            await MarketplaceInstance.addAdmin(accounts[1], { from: accounts[2] });
            assert.fail("The transaction should have thrown an error");
        }
        catch (err) {
            assert.include(err.message, "revert", "The error message should contain 'revert'");
        }
    });


    it("should add and disable storeOwner addresses", function () {
        return Marketplace.deployed().then(function (instance) {
            MarketplaceInstance = instance;
            MarketplaceInstance.addAdmin(accounts[1]);
            return MarketplaceInstance.admins(accounts[1]);
        }).then(function (isAdmin) {
            assert.isTrue(isAdmin, "The addres was not set as admin.");
        }).then(function () {
            MarketplaceInstance.addStoreOwner(accounts[2], { from: accounts[1] });
            return MarketplaceInstance.storeOwners(1);
        }).then(function (storeOwner) {
            assert.isTrue(storeOwner.enrolled, "The address was not set as storeOwner.");
        }).then(function () {
            return MarketplaceInstance.checkStoreOwner(accounts[2], { from: accounts[1] });
        }).then(function (isStoreOwner) {
            assert.isTrue(isStoreOwner, "The address did not check as storeOwner.");
        }).then(function () {
            MarketplaceInstance.disableStoreOwner(accounts[2], { from: accounts[1] });
            return MarketplaceInstance.storeOwners(1);
        }).then(function (storeOwner) {
            assert.isFalse(storeOwner.enrolled, "The address was not disabled as storeOwner");
        });
    });

    it("should revert when calling onlyAdmin function from non admin address", async function () {
        try {
            await MarketplaceInstance.addStoreOwner(accounts[2], { from: accounts[3] }).then(function () { })
            assert.fail("The transaction should have thrown an error");
        }
        catch (err) {
            assert.include(err.message, "revert", "The error message should contain 'revert'");
        }
    });


});
