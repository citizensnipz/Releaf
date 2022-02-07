import React from 'react';
import Web3 from 'web3';
import Layout from './components/Layout';
import AccountDrawer from './components/AccountDrawer';



function App () {


	return (
		<div className="App" style={{margin: '0 auto'}}>
	      <AccountDrawer />
	      <Layout>


	      </Layout>
	      

	    </div>

	);
	
}

export default App;