import React from 'react';
import { Grid, Button, useMediaQuery } from '@material-ui/core';
import DetailSmall from './DetailSmall';
import DetailMed from './DetailMed';
import DetailLarge from './DetailLarge';




const Detail = () => {


	const large = useMediaQuery('(min-width:1400px)');
	const medium = useMediaQuery('(min-width:900px)');
	const small = useMediaQuery('(min-width:600px)');


	if(large) {
		return <DetailLarge />;
	} else if (medium) {
		return <DetailMed />;
	}	else  {
		return <DetailSmall />;
	}

}

export default Detail;