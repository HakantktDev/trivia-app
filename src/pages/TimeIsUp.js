import { useHistory } from 'react-router-dom';
import wrong from '../wrong.png';
const TimeIsUp = () => {
	const history = useHistory();
	const goBack = () => {
		history.push('/');
	};
	return (
		<div className='row mt-50'>
			<div className='full-container'>
				<div className='centered-column'>
					<img src={wrong} alt='' className='image-icon' />
					<h2 className='new-alert'>Sorry.Your time is up!!!</h2>
				</div>
				<div className='centered-column'>
					<button onClick={goBack} className='default-button'>
						GO BACK TO START
					</button>
				</div>
			</div>
		</div>
	);
};

export default TimeIsUp;
