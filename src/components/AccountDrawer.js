import React, {useContext, useState} from 'react';
import { Box, TextField, Container, Drawer } from '@material-ui/core';
import UserContext from '../store/user-context';
import Releaf from '../evm/releaf';


const AccountDrawer = () => {
	const ctx = useContext(UserContext);

	const trunc = (str) => {
		return str.slice(0, 16) + '...';
	}


	return (
		<Drawer
            anchor='right'
            open={ctx.drawerOpen}
            onClose={ctx.onClose}
          >
          	<Container style={{backgroundColor: '#487539', height: '100%', color: 'white', fontFamily: 'Montserrat'}}>
	        	<Box
	        		sx={{width: 250}}
	        		role="presentation"
	        	>
	        		<h2>Your account:</h2>
	        		<h3>{trunc(ctx.account)}</h3>
	        		<h2>RLF balance:</h2>
	        		<h3>{ctx.balance}</h3>
	        		<h2>Current Value:</h2>
	        		<h3>{ctx.price}</h3>
	        	</Box>
        	</Container>   
        </Drawer>

		)


}


export default AccountDrawer;