import React, { useEffect, useState } from 'react'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux';
import { setEnactedDistricting, setSelectedState, incrementStep , resetSelectedState, setStateList, setDisplayedDistricting} from '../../actions'
import { StarRateSharp } from '@material-ui/icons';


function SelectState(props) {

	const stateList = useSelector(state => state.stateList);
	const selectedState = useSelector(state => state.selectedState);
	const selectedIndex = selectedState.stateId;
	const dispatch = useDispatch();

	useEffect(() => {

		async function fetchStates() {
			let res = await axios('http://localhost:8080/lemonke/states')
			dispatch(setStateList(res.data));
		}

		fetchStates();
	}, [])


	async function fetchEnactedGeometry(id) {
		let res = await axios(`http://localhost:8080/lemonke/districtings/${id}/geometry`)
		dispatch(setEnactedDistricting(res.data));
	}



	async function fetchEnacted(id) {
		let res = await axios(`http://localhost:8080/lemonke/districtings/${id}`)
		let districting = res.data;
		let res2 = await axios(`http://localhost:8080/lemonke/districtings/${id}/geometry`)
		districting.geometry = res2.data;
		dispatch(setEnactedDistricting(districting));
		dispatch(setDisplayedDistricting(districting));
	}
	
	function pickState(stateToUse) {
		if (stateToUse !== -1) {
			dispatch(setSelectedState(stateList[stateToUse]));
			fetchEnacted(stateList[stateToUse].enacted_districting_id);
		}else{
			dispatch(resetSelectedState());
		}
	}

	return (
		<div>
			<div>
				<br />
				<br />
				<Typography gutterBottom variant='h4'>Select State</Typography>
				<Select
					labelId="demo-customized-select-label"
					id="demo-customized-select"
					value={selectedIndex}
					onChange={(e) => pickState(e.target.value)}
				>
					<MenuItem value={-1}>
						<em>None</em>
					</MenuItem>
					{stateList.map((data, index) =>
						<MenuItem value={data['stateId']} key={data['name']}>{data['name']}</MenuItem>
					)}
				</Select>
			</div>
			<div style={{ left: '5%', bottom: '2%', position: 'fixed', backgroundColor: 'white' }}>
				<div>
					<Button disabled={true}>Back</Button>
					<Button
						disabled={selectedIndex === -1}
						variant="contained"
						color="primary"
						onClick={() => dispatch(incrementStep())}>
						Next
					</Button>
				</div>
			</div>
		</div>
	)
}

export default SelectState;