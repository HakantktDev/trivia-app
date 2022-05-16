import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { handleAmountChange, handleScoreChange } from '../redux/actions';
import correct from '../correct.png';

const FinalScreen = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { score } = useSelector((state) => state);

	const handleBackToSettings = () => {
		dispatch(handleScoreChange(0));
		dispatch(handleAmountChange(0));
		history.push('/');
	};

	return (
		<div className='row mt-50'>
			<div className='centered-column'>
				<img src={correct} alt='correct' className='image-icon' />
				<h2 className='new-alert-two'>
					Congratulations!!! You have finish the game.
				</h2>
				<h2 className='new-alert-two'> Your Final Score is: {score}</h2>
				<button
					onClick={handleBackToSettings}
					variant='outlined'
					className='default-button'>
					PLAY AGAIN
				</button>
			</div>
		</div>
	);
};

export default FinalScreen;
