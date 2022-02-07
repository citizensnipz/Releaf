import React from 'react';
import { Grid, Button, Divider, makeStyles, useMediaQuery } from '@material-ui/core';
import styles from '../styles/styles.module.css';

const useStyles = makeStyles(() => ({
	detailGridSmall: {
		paddingTop: '0%',
		marginBottom: '-20%'
	},
	textGridMobile: {
		fontSize: '20px',
		backgroundColor: '#487539',
		height: '40%',
		marginTop: '2em',
		padding: '1em',
		marginBottom: '-10px'
	},
	textGridSmall: {
		fontSize: '20px',
		backgroundColor: '#75396D',
		height: '100%',
		padding: '1em',
		paddingTop: '50%',
		zIndex: '1',
		position: 'absolute',
		textAlign: 'center'

	},
	bkgrndImg: {
		position: 'absolute',
		zIndex: '-2',
		objectFit: 'cover',
		overflow: 'hidden',
		paddingTop: '0em'

	},
	bkgrndDivSolution: {
		height: '30em',
		position: 'relative'
	},
	bkgrndImgMobile: {
		width: '100%', 
		minWidth: '800px',
		position: 'absolute', 
		zIndex: '-1',
	},
	lightPurpGrid: {
		backgroundColor: "#9D72C2",
		zIndex: '2',
		color: 'white',
		width: 'auto',
		height: '50%',
		borderBottomRightRadius: '50%',
		borderBottomLeftRadius: '50%',
		position: 'static',
		textAlign: 'center'

	},
	miniGrid: {
		backgroundColor: '#75312E',
		textAlign: 'center',
		transition: '0.5s',
		"&:hover": {
			backgroundColor: '#C2504C'
		}
	},
	bgDivSolMed: {
		height: '40em',
		position: 'relative'
	},
	logo: {
		'&:hover': {
			height: '160px'
		}
	}
}));

const DetailSmall = () => {

	const { detailGridSmall, textGridMobile, textGridSmall, bkgrndImg, bkgrndImgMobile, bkgrndDivSolution, lightPurpGrid, miniGrid, bgDivSolMed, logo } = useStyles();

	const medSm = useMediaQuery('(min-width:650px)');

	return (
		<Grid container spacing={2} style={{fontFamily: 'Montserrat', color: 'white'}}>



			{/* the problem div */}
			<Grid container xs={12} style={{position: 'static', textAlign: 'center'}}>

				<Grid item xs={12} md={6} >
					<div >
						<iframe 
							title='Hectares of forests cut down or burned' 
							src='https://www.theworldcounts.com/embed/challenges/93?color=white&font_size=25' 
							style={{border: 'none'}} 
							height='200' 
							width='300'>
						</iframe>
					</div>

							
				</Grid>
				<Grid item xs={12} md={6} className={detailGridSmall}>
					<div>
						<iframe 
							title='Great Pacific Garbage Patch' 
							src='https://www.theworldcounts.com/embed/challenges/6?color=white&font_size=25' 
							style={{border: 'none'}} 
							height='300' 
							width='400'>
						</iframe>
					</div>

				</Grid>

				<Grid item xs={12} md={12} className={textGridMobile}>
					<p>
						Whether you believe in climate change or not is irrelevant. The fact is
						trees are cut down or burned faster than they can be replaced. 
						Local wildlife is displaced and the natural
						environments suffer leading to floods, droughts or landslides.
					</p>
					<p>
						Not just animals need these environments. Millions of people
						worldwide rely on these diminishing resources.
						Helping the Earth means helping our fellow humans.
					</p>
				</Grid>

				<img src='/assets/img/trees5.jpg' className={bkgrndImg}/>
			</Grid>





			{/*solution div*/}
			<Grid container xs={12} className={medSm ? bgDivSolMed : bkgrndDivSolution}>
				
				<Grid item xs={12} className={lightPurpGrid} id="solution">
					<h1 className={styles.jumboHeaderMobile}>The SOLUTION:</h1>
				</Grid>

				
			
				<Grid item xs={12} className={textGridSmall}>

					<p >
						The good news is there's something we can do to help, and you might even make
						some money in the process! By purchasing and selling Releaf, you
						are contributing to a community fund that donates to tree planting around the
						world. Take action!
					</p>

					<Button
						variant='contained'
					>
						How does it work?
					</Button>
				</Grid>


				
			</Grid>



			{/* vendor div */}
			<Grid container>
				<Grid item xs className={miniGrid}>
					<h2>4,452 trees planted so far!</h2>
				</Grid>
				<Divider orientation="vertical" style={{backgroundColor: 'white'}}flexItem>
				</Divider>
				<Grid item xs className={miniGrid}>
					<h2>$4,598 already contributed to vendors:</h2>
				
				</Grid>
			</Grid>



			<Grid container style={{textAlign: 'center', marginBottom: '2em', }}>
				<Grid item xs={12}>
					<h1 style={{fontFamily: 'Josefin Sans', fontWeight: '300', fontSize: '3em' }}> Take a look at some of our amazing vendors:</h1>
				</Grid>


				




	    		<Grid item xs={12}>
		    			<a href='https://trees.org' >
		    				<img src='/assets/img/trees_org_logo.png' height='140' className={logo}/>
		    			</a>
					</Grid>
					<Grid item xs={12}>
						<a href='https://coolearth.org' >
		    				<img src='/assets/img/coolearth_logo.png' height='140' className={logo}/>
		    			</a>
					</Grid>
					<Grid item xs={12}>
						<a href='https://teamseas.org' >
		    				<img src='/assets/img/teamseas-logo.png' height='140' className={logo}/>
		    			</a>
					</Grid>

				<img src='/assets/img/trees6.jpg' className={bkgrndImgMobile}/>
			</Grid>

		</Grid>
		


		)


}


export default DetailSmall;