import React, { useEffect, useState } from 'react';
import { Grid, Button, ButtonGroup, LinearProgress, TextField, makeStyles } from '@material-ui/core';
import Releaf from '../evm/releaf';
import Dai from '../evm/dai';

const Utility = (props) => {

	const [currPrice, setCurrPrice] = useState();
	const [buyPrice, setBuyPrice] = useState();
	const [buyAmnt, setBuyAmnt] = useState();
	const [account, setAccount] = useState();
	const [totalSupply, setTotalSupply] = useState();
	const [fundPool, setFundPool] = useState();

	useEffect(() => {
		async function getPrice() {
			const price = await Releaf.methods.getCurrentPrice().call()/(10**6);
			const numTokens = await Releaf.methods.totalSupply().call()/(10**6);
			const fundPoolTokens = await Releaf.methods.showDaiPool().call()/(10**18);
			setFundPool(fundPoolTokens);
			setTotalSupply(numTokens);
			setCurrPrice(price);
			setAccount(props.account);
		}

		getPrice();

	})

	const useStyles = makeStyles(() => ({
		container: {
			textAlign: "center",
			fontFamily: 'Montserrat',
			color: 'white',
			backgroundColor: '#753634'
		},
	}));


	const findPrice = async (props) => {
		if (props.value > 0) {
			//converts value to match 6 decimal places of Releaf token
			let val = props.value * (10**6);
			setBuyAmnt(val);
			let price = await Releaf.methods.priceBuySellTokens(true, val).call();
			console.log(price);
			//converts the value for display purposes only
			price = price/(10**6);

			setBuyPrice(price);


			
		} else {
			setBuyPrice(0);
		}
	}


	const getApproval = async () => {
		let approveAmount = buyPrice * (10**18);
		let strNum = approveAmount.toString();
    	try {
    		var releafAddr = '0xcA43DE45ce615F1B3252B4A564E39C6D4767fD75';
	    	await Dai.methods.approve(releafAddr, strNum).send({from: account});
    	} catch (error) {
    		console.log(error);
    	}
    	

    };

	const buyButtonClickHandler = async () => {
		try {
			await getApproval();
			await Releaf.methods.buyRLF(buyAmnt).send({from: account});
		} catch (error) {
			console.log(error);
		}
		
	}

	const sellButtonClickHandler = async () => {
		try {
			await Releaf.methods.sellRLF(sellAmnt.send({from: account}));
		} catch (error) {
			console.log(error);
		}

	}



	const { container } = useStyles();

	return (
		<Grid container spacing={2} className={container} id="buy">
			<Grid item xs={12}>
				<h1>Current Price:</h1>
				<h3>${currPrice || 0} Dai</h3>
				<TextField
				 style={{backgroundColor: 'white', borderRadius: '0.5em'}}
				 id="amount" 
				 type="number" 
				 label="Enter an amount" 
				 variant="filled"
				 onChange={event => findPrice({ value: event.target.value })} />
			</Grid>
			<Grid item xs={12}>
				<h2>${buyPrice || 0} Dai</h2>
			</Grid>
			<Grid item xs={12}>
				<ButtonGroup variant='outlined'>
					<Button 
						style={{backgroundColor: '#86C272', color: 'white', minWidth: '150px'}} 
						onClick={buyButtonClickHandler}>
						Buy
					</Button>
					<Button 
						style={{backgroundColor: '#C2504C', color: 'white', minWidth: '150px'}}
						onClick={sellButtonClickHandler}>
						Sell
					</Button>
				</ButtonGroup>
			</Grid>
			<Grid item xs={12}>
				<h1> ${fundPool} raised for next funding round</h1>
				<LinearProgress variant="determinate" value='27' />
				
				<h1>Tokens in circulation:</h1>
				<h3>{totalSupply}</h3>
			</Grid>


		</Grid>

		)

}

export default Utility;