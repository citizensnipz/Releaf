import React from 'react';
import { Grid, Button, Divider, makeStyles } from '@material-ui/core';
import styles from '../styles/styles.module.css';

const useStyles = makeStyles(() => ({
	detailGridSmall: {
		paddingTop: '0%',
		marginBottom: '-20%'
	},
	textGridProblem: {
		fontSize: '20px',
		backgroundColor: '#487539',
		height: '40%',
		marginTop: '2em',
		padding: '1em',
		paddingBottom: '6em',
		marginBottom: '-2%'
	},
	textGridSolution: {
		fontSize: '20px',
		backgroundColor: '#75396D',
		height: 'auto',
		padding: '1em',
		paddingTop: '10em',
		marginTop: '-10%',
		textAlign: 'center'
	},
	bkgrndImg: {
		position: 'absolute',
		zIndex: '-2',
		objectFit: 'cover',
		overflow: 'hidden',
		paddingTop: '0em'

	},
	bkgrndDivMedium: {
		height: '30em'
	},
	bkgrndImgMed: {
		width: '100%',
		height: '100%',
		minWidth: '800px',
		position: 'absolute',
		overflow: 'hidden',
		objectFit: 'none',
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
	logo: {
		'&:hover': {
			height: '160px'
		}
	}
}));

const DetailLarge = () => {

	const { detailGridSmall, textGridProblem, textGridSolution, bkgrndImg, bkgrndImgMed, bkgrndDivMedium, lightPurpGrid, miniGrid, logo } = useStyles();

	return (
		<Grid container spacing={2} style={{fontFamily: 'Montserrat', color: 'white'}}>
			<img src='/assets/img/trees5.jpg' className={bkgrndImg}/>
			<Grid container xs={12} style={{position: 'static', textAlign: 'center', paddingTop: '5%'}}>

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
				<Grid item xs={12} md={6} >
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

				<Grid item xs={12} md={12} className={textGridProblem}>
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

				
			</Grid>
			<Grid container xs={12} className={bkgrndDivMedium}>
				<Grid item xs={12} className={lightPurpGrid} id="solution">
					<h1 className={styles.jumboHeaderLarge}>The SOLUTION:</h1>
				</Grid>


				
			
				<Grid item xs={12} className={textGridSolution}>

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

				<Grid container>
					<Grid item xs className={miniGrid}>
						<h2>4,452 trees planted so far!</h2>
					</Grid>
					<Divider orientation="vertical" style={{backgroundColor: 'white'}} flexItem />
					<Grid item xs className={miniGrid}>
						<h2>$4,598 already contributed to vendors:</h2>
					</Grid>
				</Grid>



				<Grid container style={{textAlign: 'center', marginBottom: '2em', }}>
					<Grid item xs={12}>
						<h1 style={{fontFamily: 'Josefin Sans', fontWeight: '300', fontSize: '3em' }}> Take a look at some of our amazing vendors:</h1>
					</Grid>


					




		    		<Grid item xs={4}>
		    			<a href='https://trees.org' >
		    				<img src='/assets/img/trees_org_logo.png' height='140' className={logo}/>
		    			</a>
					</Grid>
					<Grid item xs={4}>
						<a href='https://coolearth.org' >
		    				<img src='/assets/img/coolearth_logo.png' height='140' className={logo}/>
		    			</a>
					</Grid>
					<Grid item xs={4}>
						<a href='https://teamseas.org' >
		    				<img src='/assets/img/teamseas-logo.png' height='140' className={logo}/>
		    			</a>
					</Grid>

					<img src='/assets/img/trees6.jpg' className={bkgrndImgMed}/>
				</Grid>

			</Grid>
		


		)


}


export default DetailLarge;