import React from 'react';
import Button from '@material-ui/core/Button';
import Sidepanel from '../UI/Sidepanel/Sidepanel';
import Map from '.././UI/Map/Map';

function HomePage() {

	// TODO:
	// These are just some ideas of what I thoght I might look like.
	// The drawer "I thought" might be a cool way to keep all the settings. (however I see that there's no point for it to dissapear)
	// https://material-ui.com/components/drawers/
	// These are just other cool things I found on ther Website.
	// https://material-ui.com/components/tabs/

	

	return (
		<>
			<Sidepanel />
			<Map />
		</>
	)
}

export default HomePage;