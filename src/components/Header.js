import * as React from 'react';
import { useContext } from 'react';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles, Toolbar, Box, IconButton, MenuItem, Menu, AppBar, Grid } from '@material-ui/core';
import UserContext from '../store/user-context';


const useStyles = makeStyles(() => ({
	header: {
		backgroundColor: "#487539",

	},
	menu: {
		"& .MuiPaper-root": {
	      backgroundColor: "#75312E"
	    }
	}
}));

	  


const Header = () => {
	const { header, menu } = useStyles();
	const ctx = useContext(UserContext);

	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
	  setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
	   setAnchorEl(null);
	};



	return (
	<Grid container sx={{ flexGrow: 1 }} spacing={2} id='menuGrid'>
		<AppBar position="static" className={header}>
			<Toolbar >
				
				<IconButton
				id='menu'
			        size="large"
			        edge="start"
			        color="inherit"	
			        aria-label="menu"
			        sx={{ mr: 2 }}
			        onClick={handleClick}
			        aria-controls={open ? 'basic-menu' : undefined}
        			aria-haspopup="true"
       			 	aria-expanded={open ? 'true' : undefined}

			      >
		      		<MenuIcon />
		      	</IconButton>
		      	<Menu
		      		className={menu}
		      		id='basic-menu'
		      		getContentAnchorEl={null}
		      		anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
   	 				transformOrigin={{ vertical: "top", horizontal: "center" }}
		      		anchorEl={anchorEl}
		      		open={open}
		      		onClose={handleClose}
		      		menuListProps={{
		      			'aria-labelledby': 'menu',

		      		}}
		      	>
		      		<MenuItem onClick={ctx.onOpen} style={{color: 'white'}}>My Account</MenuItem>
		      		<a href="#problem">
		      			<MenuItem onClick={handleClose}>Why Releaf?</MenuItem>
		      		</a>
		      		<a href="#solution">
		      			<MenuItem onClick={handleClose}>How can Releaf help?</MenuItem>
		      		</a>
		      		<a href="#buy">
		      			<MenuItem onClick={handleClose}>Buy/Sell RLF</MenuItem>
		      		</a>
		      	</Menu>
		      	<img src='assets/img/leaf_logo.png' height='50px' />
		      <h1 style={{fontFamily: 'Arbotek', fontWeight: '300'}}>Releaf</h1>
		      <Grid
					item
					container
					direction="column"
					alignItems="flex-end"
					justifyContent="flex-end"
				>
		      <MenuItem >
		      	<AccountCircle onClick={ctx.onOpen}/>
		      </MenuItem>
		      </Grid>
			</Toolbar>

		</AppBar>	
	</Grid>
  );
}


export default Header;