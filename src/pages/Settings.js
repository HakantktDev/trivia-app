import { CircularProgress } from '@mui/material';
import { useHistory } from 'react-router-dom';
import useAxios from '../hooks/useAxios';
import { useDispatch } from 'react-redux';
import {
	handleAmountChange,
	handleCategoryChange,
	handleDifficultyChange,
} from '../redux/actions';

const Settings = () => {
	const { response, error, loading } = useAxios({ url: '/api_category.php' });
	const history = useHistory();
	const dispatch = useDispatch();
	const categoryChangeHandler = (e) => {
		dispatch(handleCategoryChange(e.target.value));
	};
	const difficultyChangeHandler = (e) => {
		dispatch(handleDifficultyChange(e.target.value));
	};
	const enteredAmountHandler = (e) => {
		dispatch(handleAmountChange(e.target.value));
	};

	if (loading) {
		return (
			<div className='row'>
				<CircularProgress className='centered-column mt-50' />
			</div>
		);
	}

	if (error) {
		return <h2 className='new-alert'>Something Went Wrong!</h2>;
	}

	const difficultyOptions = [
		{ id: 'easy', name: 'Easy' },
		{ id: 'medium', name: 'Medium' },
		{ id: 'hard', name: 'Hard' },
	];

	const handleSubmit = (e) => {
		e.preventDefault();
		history.push('/questions');
	};

	return (
		<div className='row'>
			<form onSubmit={handleSubmit} className='full-container'>
				<div className='centered-column'>
					<select
						className='w-100'
						name='Difficulty'
						onChange={difficultyChangeHandler}
						defaultValue=''
						required>
						<option value='' disabled>
							Difficulty
						</option>
						{difficultyOptions.map((item) => (
							<option value={item.id} key={item.id}>
								{item.name}
							</option>
						))}
					</select>
				</div>
				<div className='centered-column'>
					<select
						className='w-100'
						name='Category'
						onChange={categoryChangeHandler}
						defaultValue=''
						required>
						<option value='' disabled>
							Category
						</option>
						{response.trivia_categories.map((item) => (
							<option value={item.id} key={item.id}>
								{item.name}
							</option>
						))}
					</select>
				</div>
				<div className='centered-column'>
					<input
						type='number'
						min='10'
						max='50'
						placeholder='Amount Of Questions'
						required
						onChange={enteredAmountHandler}
					/>
				</div>
				<div className='row'>
					<button type='submit' className='default-button'>
						GET STARTED
					</button>
				</div>
			</form>
		</div>
	);
};

export default Settings;
