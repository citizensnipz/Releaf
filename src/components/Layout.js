import React from 'react';
import Header from './Header';
import Jumbo from './Jumbo';
import Detail from './Detail';
import Footer from './Footer';

import Utility from './Utility';
import { useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import Web3 from 'web3';

const Layout = (props) => {

	const [account, setAccount] = useState();


	  useEffect(() => {
	    async function load() {
	      const web3 = new Web3(Web3.givenProvider || 'https://rinkeby.infura.io/v3/645400af42ff49c6b7c256eb23096d1d');
	      const accounts = await web3.eth.requestAccounts();

	      setAccount(accounts[0]);
	    }

	    load();
	    
	  }, []);

	return (
		<>
			<Header />
			<Jumbo account={account}/>
			<Detail />
			<Utility account={account}/>
			{props.children}

			<Footer />
		</>


		)

};


export default Layout;