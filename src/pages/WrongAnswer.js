import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { handleAmountChange, handleScoreChange } from '../redux/actions';
import wrong from '../wrong.png';

const WrongAnswer = () => {
	const disptach = useDispatch();
	const history = useHistory();

	const handleBackToSettings = () => {
		disptach(handleScoreChange(0));
		disptach(handleAmountChange(50));
		history.push('/');
	};

	return (
		<div>
			<div className='row mt-50'>
				<div className='full-container'>
					<div className='centered-column'>
						<img src={wrong} alt='' className='image-icon' />
						<h2 className='new-alert'>Sorry, wrong Answer.The game is Over!</h2>
						<div className='centered-column'>
							<button onClick={handleBackToSettings} className='default-button'>
								GO BACK TO START
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default WrongAnswer;
