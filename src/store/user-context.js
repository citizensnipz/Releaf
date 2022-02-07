import React, {useState, useEffect} from 'react';
import Web3 from 'web3';
import Releaf from '../evm/releaf';

const UserContext = React.createContext({
	isLoggedIn: false,
	drawerOpen: false,
	onOpen: () => {},
	onClose: () => {}
});

export const UserContextProvider = (props) => {
	const [drawerOpen, setDrawerOpen] = useState(false);

	const [account, setAccount] = useState("Connect your wallet");

	const [balance, setBalance] = useState(0);

	const [price, setPrice] = useState(0);


	  useEffect(() => {
	    async function load() {
	      const web3 = new Web3(Web3.givenProvider || 'https://rinkeby.infura.io/v3/645400af42ff49c6b7c256eb23096d1d');
	      const accounts = await web3.eth.requestAccounts();
	      setAccount(accounts[0]);
	      let bal = await Releaf.methods.balanceOf(accounts[0]).call()/(10**6);
	      setBalance(bal);
	      bal = bal * (10**6);
	      const sellPrice = await Releaf.methods.priceBuySellTokens(false, bal).call();
	      setPrice(sellPrice/(10**6));
	    }

	    load();
	    
	  }, []);

	const closeDrawerHandler = () => {
		setDrawerOpen(false);
	};

	const openDrawerHandler = () => {
		setDrawerOpen(true);
	};

	return (
		<UserContext.Provider
			value={{
				drawerOpen: drawerOpen, 
				onOpen: openDrawerHandler, 
				onClose: closeDrawerHandler,
				account: account,
				balance: balance,
				price: price,
			}}
		>
			{props.children}
		</UserContext.Provider>

		)

}

export default UserContext;