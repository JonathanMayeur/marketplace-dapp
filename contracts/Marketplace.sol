pragma solidity ^0.5.0;

import "client/node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";

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

    uint256 articleCounter;
    enum ArticleState { ForSale, Sold, NoSale }
    struct Article {
        uint id;
        string name;
        string description;
        uint256 price;
        address seller;
        address buyer;
        ArticleState articleState;
    }
    mapping (uint => Article) public articles;
    mapping (address => uint[]) public articleIds;

    //
    // Modifiers
    // 
    modifier onlyAdmin(){
        require(admins[msg.sender]);
        _;
    }
    modifier onlyStoreOwner(){
        require(checkStoreOwner(msg.sender));
        _;
    }

    //
    // Events
    //
    event EditAdmin(address _admin, string _action);
    event EditStoreOwner(address _storeOwner, string _action);
    event LogSellArticle(uint indexed _id, address indexed _seller, string _name, uint _price);
    event LogBuyArticle(uint indexed _id, address indexed _buyer, string _name, uint _price);

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
        // if(checkStoreOwner(newStoreOwner)){revert();} 
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

    /** @dev Add an article for sale
      * @param name Name of article
      * @param description Description of article
      * @param price Price of article
      */   
    function sellArticle(string memory name, string memory description, uint256 price) public onlyStoreOwner {
        //check inputs!!
        articleCounter++;

        articles[articleCounter] = Article (
            articleCounter,
            name,
            description,
            price,
            msg.sender,
            address(0),
            ArticleState.ForSale
        );

        articleIds[msg.sender].push(articleCounter);
        
        emit LogSellArticle(articleCounter, msg.sender, name, price);
    }

    /** @dev get articleIds from articles where seller is storeOwner
      * @return uint[]*/
    function getArticleIds() public view onlyStoreOwner returns(uint[] memory){
        return articleIds[msg.sender]; 
    }

    /** @dev change articleState from article
      * @param articleId id of article
      * @return true if succeeded
      */
    function changeArticleState(uint256 articleId) public onlyStoreOwner returns(bool){
        require(articleId <= articleCounter);
        if(articles[articleId].articleState == ArticleState.ForSale){
            articles[articleId].articleState = ArticleState.NoSale;
        } else if(articles[articleId].articleState == ArticleState.NoSale){
            articles[articleId].articleState = ArticleState.ForSale;
        }
        return true;
    }

    /////////////////////////////////////////////////////
    // Client only functions
    ///////////////////////////////////////////////////// 
    /** @dev get articles for sale
      */
    function getArticlesForSale() public view returns(uint[] memory){
        uint[] memory articleIdsForSale = new uint[](articleCounter);

        uint numberOfArticlesForSale = 0;
        // iterate over articles
        for(uint i = 1; i <= articleCounter;  i++) {
          // keep the ID if the article is still for sale
            if(articles[i].articleState == ArticleState.ForSale) {
                articleIdsForSale[numberOfArticlesForSale] = articles[i].id;
                numberOfArticlesForSale++;
            }
        }

        // copy the articleIds array into a smaller forSale array
        uint[] memory forSale = new uint[](numberOfArticlesForSale);
        for(uint j = 0; j < numberOfArticlesForSale; j++) {
            forSale[j] = articleIdsForSale[j];
        }
        return forSale;
    }
}