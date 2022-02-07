import React from 'react';
import { Box, Grid, Button, makeStyles, useMediaQuery } from '@material-ui/core';
import Web3 from 'web3';
import Releaf from '../evm/releaf';
import styles from '../styles/styles.module.css';



const Jumbo = (props) => {

	const useStyles = makeStyles(() => ({
		jumboBtn: {
			marginTop: '450px',
			backgroundColor: '#86C272'
		},
		redGrid: {
			backgroundColor: '#753634',
			zIndex: '1',
			color: 'white',
			width: 'auto',
			height: '50em',
			marginBottom: '-300px',

		},

		purpGrid: {
			backgroundColor: '#5C3F75',
			zIndex: '2',
			height: '20em',
			color: 'white',
			textAlign: 'center',
			borderTopLeftRadius: '50%',
			borderTopRightRadius: '50%',

		},
	}));

	const matches = useMediaQuery('(min-width:900px)');
	
	const connectButtonClickHandler = async () => {
		load();
		return
	};

	const { jumboBtn, redGrid, purpGrid } = useStyles();

	return (
		<Box sx={{ flexGrow: 1 }} style={{fontFamily: 'Montserrat'}}>
			<div className={styles.jumbotron}>
				<h1 className={matches ? styles.title : styles.titleMobile}>Old problems, new solutions.</h1>
				<Button 
						variant='contained' 
						onClick={connectButtonClickHandler}
						className={jumboBtn}>
						Connect to Metamask
						
				</Button>
				<img src='/assets/img/trees2.jpg' className={styles.jumboIMG}/>
				
			</div>
			
			<Grid container spacing={2}>
				
				<Grid item xs={12} className={redGrid}>
					<div style={{paddingLeft: '5%', paddingBottom: '5%'}}>
						<h1 className={matches ? styles.jumboHeader : styles.jumboHeaderMobile}>Help the environment with every purchase or sale.</h1>

						<p>
							
						</p>
						<p>
							Ready to bring Releaf? Read below to find out more.
						</p>
					</div>
				</Grid>
				<Grid item xs={12} className={purpGrid} id="problem">
					<div style={{paddingLeft: '5%', paddingTop: '1.5em'}}>
						<h1 className={matches ? styles.jumboHeader : styles.jumboHeaderMobile}>The PROBLEM:</h1>
					</div>
				</Grid>
			</Grid>
			

		</Box>


	)

}

export default Jumbo;