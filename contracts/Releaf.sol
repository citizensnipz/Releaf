// SPDX-License-Identifier: Unlicensed

pragma solidity ^0.8.0;

import "./ERC20.sol";
import "./SafeMath.sol";
import "./Ownable.sol";
import "./ABDKMath64x64.sol";

interface DaiToken is IERC20 {
    function transferFrom(address sndr, address dst, uint wad) external override returns (bool);
    function balanceOf(address guy) external override view returns (uint);
    function transfer(address dst, uint wad) external override returns (bool);
}

contract ReLeaf is ERC20, Ownable {

    using SafeMath for uint256;
    using ABDKMath64x64 for int256;
    
    address private daiFundPool = address(1);
    address public manager;
    uint256 public priceCurve = 1;
    uint256 public tSupply = 0;
    uint8 private _decimals = 6;
    IERC20 public daiInstance;


    //math variables
    int128 coefficient = ABDKMath64x64.divi(1, 20);
    int128 one = ABDKMath64x64.fromUInt(1);
    int128 twenty = ABDKMath64x64.fromUInt(20);
    int128 fourHundred = ABDKMath64x64.fromUInt(400);
    int128 tenToSix = ABDKMath64x64.fromUInt(1000000);


    mapping(address => uint256) balances;


    uint256 public _taxFee = 15;
    

    constructor() ERC20("ReLeaf", "RLF") {
        //sets the creator as the 'manager'
        manager = msg.sender;

        daiInstance = DaiToken(0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa);

    }






    //basic functions

    function decimals() public view override returns (uint8) {
        return _decimals;
    }




    //view functions


    function viewTotalSupply() public view returns (uint256) {
        return tSupply;
    }

    function showDaiPool() public view returns (uint256) {
        return balances[daiFundPool];
    }

    function showUserBalance() public view returns (uint256) {
        return balances[msg.sender];
    }

    function showContractBalance() public view returns (uint256) {
        return daiInstance.balanceOf(address(this));
    }

    function showDaiBalance(address addy) public view returns (uint256) {
        return daiInstance.balanceOf(addy);
    }
    



    //math functions

    //calculates the current price of the next token using the "secret sauce"

    function getCurrentPrice() public view returns (uint64) {
        //formula 20ln(0.05x + 1)
        
        //converts the uint256 to a useable signed int128 fixed point number for calculation
        int128 priceCurve64 = ABDKMath64x64.fromUInt(tSupply);
        //massages the number down from 10**6 for use in calculation
        priceCurve64 = ABDKMath64x64.div(priceCurve64, tenToSix);
        //calculates the coefficient of the x value
        int128 x = ABDKMath64x64.mul(coefficient, priceCurve64);

        x = ABDKMath64x64.add(x, one);
        int128 y = ABDKMath64x64.ln(x);
        int128 price = ABDKMath64x64.mul(y, twenty);
        //brings the number back up for display and use
        price = ABDKMath64x64.mul(price, tenToSix);
        uint64 price64 = ABDKMath64x64.toUInt(price);
        return price64;
    }

    function lnOfAmount(int128 x) public view returns (int128) {
        //creates 64.64 values for integers
        //int128 amnt = ABDKMath64x64.fromUInt(amount);

        //creates the necessary parts of the integral function
        int128 multiplier = ABDKMath64x64.mul(twenty, x);
        multiplier = ABDKMath64x64.add(multiplier, fourHundred);
        int128 base = ABDKMath64x64.mul(coefficient, x);
        base = ABDKMath64x64.add(base, one);
        int128 b = ABDKMath64x64.mul(twenty, x);
       
        //combines pieces of the function
        int128 log = ABDKMath64x64.ln(base);
        log = ABDKMath64x64.mul(multiplier, log);
        int128 poolBalance = ABDKMath64x64.sub(log, b);

        return poolBalance;
    }


    function priceBuySellTokens(bool isBuy, uint256 amount) public view returns (uint64) {
        //integral is f(x) = (20x + 400)ln(0.05 + 1) - 20x + C

        /**
         * The input numbers are going to be to 6 decimal places (10**6)
         * The input number needs to first be divided down,
         * then used in the formula, and then multiplied back up
         * 
         * 
         *
         ***/
 
        //massages the numbers from 6 decimal places
        int128 x = ABDKMath64x64.fromUInt(tSupply);
        x = ABDKMath64x64.div(x, tenToSix);
        int128 amnt = ABDKMath64x64.fromUInt(amount);
        amnt = ABDKMath64x64.div(amnt, tenToSix);

        //establishes the pool balances
        int128 x2; 
        int128 poolBalance = lnOfAmount(x);
        int128 newPoolBalance; 

        int128 price64;
        if (isBuy) {
            x2 = ABDKMath64x64.add(x, amnt);
            newPoolBalance = lnOfAmount(x2);
            price64 = ABDKMath64x64.sub(newPoolBalance, poolBalance);
        } else {
            x2 = ABDKMath64x64.sub(x, amnt);
            newPoolBalance = lnOfAmount(x2);
            price64 = ABDKMath64x64.sub(poolBalance, newPoolBalance);
        }
        price64 = ABDKMath64x64.mul(price64, tenToSix);
        uint64 price = ABDKMath64x64.toUInt(price64);
        return price;
    }

    
    function calcFee(uint256 amount) private view returns (uint256) {
        //sets fee at 1.5%
        return amount.mul(_taxFee).div(
            10**3
        );
    }


    function viewVendorFunds() public view returns (uint256) {
        uint256 liqFunds = uint256(priceBuySellTokens(false, tSupply));
        uint256 totalFunds = address(this).balance;
        uint256 vendorFunds = totalFunds.sub(liqFunds);
        return vendorFunds;
    }


    //web interface functions



    function buyRLF(uint256 amount) public {
        uint256 daiAmount = priceBuySellTokens(true, amount);

        daiAmount = daiAmount * (10**12);
        /**
         * The number output by "priceBuySellTokens" will be to 6 decimal places
         * This will increase the value by 10^12 so that it works with the
         * Dai instance
         * 
         * **/
        uint256 fee = calcFee(daiAmount);
        
        //adjusts the amount bought by deducting the fee
        //uint256 purchaseAmnt = daiAmount.add(fee);

        
        //transfers the adjusted amount from the user to the contract
        require(daiInstance.transferFrom(msg.sender, address(this), daiAmount), "Transfer didn't work");
        

        //increases the total supply
        tSupply += amount;

        balances[daiFundPool] += fee;

        //adds the amount to the user's balance
        balances[msg.sender] += amount;

        //mints the amount to the user's wallet
        _mint(msg.sender, amount);
    }
    


    function sellRLF(uint256 amount) payable public {
        require(tSupply >= amount, "Insufficient tokens available");
        uint256 daiAmount = priceBuySellTokens(false, amount);

        daiAmount = daiAmount * (10**12);

        uint256 fee = calcFee(daiAmount);

        //adjusts the amount to sell to keep the fee in the contract balance
        uint256 sellAmount = daiAmount.sub(fee);
        
        //does some checks for a valid transaction
        
        require(daiInstance.balanceOf(address(this)) >= sellAmount, "Insufficient funds to sell");
        require(balances[msg.sender] >= amount, "Insufficient tokens to sell");

        //transfers the adjusted amount to the user
        require(daiInstance.transfer(msg.sender, sellAmount), "Sell transaction failed");
        
        //reduces the total supply by the original amount in RLF
        tSupply -= amount;

        //
        balances[daiFundPool] += fee;

        //reduces the balance of the user
        balances[msg.sender] -= amount;

        //burns the tokens in the user's wallet
        _burn(msg.sender, amount);

    }

    
    //voting section

    
    //data objects
    struct Voter {
        bool hasVoted;
        address delegate;
        uint vote;
        uint dispersalRound;
    }
    
    struct Proposal {
        address walletAddress;
        uint voteCount;
        string name;
        uint amount;
    }
    
    struct Dispersal {
        uint count;
        uint amount;
    }

    //a list of all the people participating in the vote
    mapping(address => Voter) public voters;
    //a list of all available proposals
    Proposal[] public proposals;

    //counter of votes cast
    uint tVotes;

    Dispersal dispersals = Dispersal(
        {
            count: 0,
            amount: 0
        }
    );
    

    //view functions

    function dispersalAmount() public view returns (uint) {
        return dispersals.amount;
    }

    function dispersalCount() public view returns (uint) {
        return dispersals.count;
    }

    function checkVotingRights() public view returns (bool) {
        return (balances[msg.sender] > 1000) ? true : false;
    }

    function checkVotes(uint proposal) public view returns (uint) {
        require(proposals.length >= 1, "There are no proposals right now!");
        return proposals[proposal].voteCount;
    }

    





    //voting functions

    //the first proposal is reached at 0, since it is stored as an array.
    function vote(uint propNum) public {
        //first checks if the user actually has a balance
        require(checkVotingRights(), "You must hold a balance to vote.");
        //second, checks if the user has ever voted before
        //and creates an object for them if not
        if(voters[msg.sender].hasVoted != true) {
            Voter storage sender = voters[msg.sender];
            sender.hasVoted = true;
        }
        //third, checks if the user has already voted on this proposition
        require(voters[msg.sender].dispersalRound == dispersals.count, "You have already voted.");
        

        voters[msg.sender].vote = propNum;
        //increases the vote count of the chosen proposal
        proposals[propNum].voteCount += 1;
        //increments the total num of votes
        tVotes += 1;
    }

    
    function countVotes() private {
        //initiates a vote when community wallet has reached a goal
        if(goalReached()) {
            uint propWinner = propWinner();
            awardProposal(propWinner);
        }

    }

    function goalReached() internal view returns (bool) {
        return (balances[daiFundPool] >= address(this).balance.div(10)) ? true : false;
    }
    
    function weighVotes(uint a, uint b) internal view returns (uint) {
        uint prop;
        if (proposals[a].voteCount > proposals[b].voteCount) {
            prop = a;
        } else if (proposals[b].voteCount > proposals[a].voteCount) {
            prop = b;
        } else if (proposals[a].voteCount == proposals[b].voteCount) {
            prop = 999;
        }
        return prop;
    }


    function propWinner() public view returns (uint) {
        uint votedProp;

        //if no votes are cast, awards first in the list
        if(tVotes < 1) {
            votedProp = 0;
            return votedProp;
        }

        //
        for (uint i = 0; i < proposals.length - 1; i++) {
            //chooses the prop with the most votes
            votedProp = weighVotes(i, i + 1);
            //in the event of a tie, choose the prop with the least amount
            //already awarded to it
            if (votedProp == 999) {
                votedProp = propAwardedLess(i, i + 1);
            }
        }

        return votedProp;
    }






    //proposal functions

    function createProposal(address _address, string memory _name) public {
        require(msg.sender == manager, "You are not allowed to create a proposal.");
        Proposal memory newProp = Proposal(
            {
            walletAddress: _address,
            name: _name,
            voteCount: 0,
            amount: 0
            }
        );
        proposals.push(newProp);
        
    }


    function propAwardedLess(uint a, uint b) internal view returns (uint) {
        return (proposals[a].amount <= proposals[b].amount) ? a : b;
    }

    function awardProposal(uint propNum) public {
        //distributes the contents of community wallet to the winning vendor

        //adds values to keep track of dispersal data
        dispersals.count += 1;
        dispersals.amount += balances[daiFundPool];

        proposals[propNum].amount += balances[daiFundPool];
        

        daiInstance.transferFrom(address(this), proposals[propNum].walletAddress, balances[daiFundPool]);
        
        //resets
        balances[daiFundPool] = 0;
        tVotes = 0;
    }
    

    
}