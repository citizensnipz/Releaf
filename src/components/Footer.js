import React from 'react';
import { makeStyles, Grid} from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';


const useStyles = makeStyles(() => ({
	footer: {
		backgroundColor: "#487539",
		fontFamily: 'Arbotek', 
		fontWeight: '300', 
		color: 'white',
		bottom: '0',
		zIndex: '2'
	},
}));

const Footer = () => {
	const { footer } = useStyles();

	return (
			<Grid container spacing={2} className={footer}>	
				<Grid item xs={0} style={{paddingTop: '15px'}}>
					<img src='assets/img/leaf_logo.png' height='50px'/>
				</Grid>
				<Grid item xs={7}>
		      		<h1 style={{fontFamily: 'Arbotek', fontWeight: '300'}}>Releaf</h1>
				</Grid>
				<Grid item xs={4}>
					<p>Contact Us</p>
					<p>About Us</p>
					<p>FAQ</p>
					<FacebookIcon />
					<TwitterIcon />
				</Grid>
			</Grid>
		)
}


export default Footer;