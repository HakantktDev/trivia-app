import correct from '../correct.png';

const CorrectAnswer = (props) => {
	const theAnswerIsTrue = () => {
		const isTrueAnswer = true;
		props.trueAnswer(isTrueAnswer);
		const resetCount = 15;
		props.resetCount(resetCount);
	};
	return (
		<div className='row'>
			<div className='centered-column'>
				<img src={correct} alt='correct' className='image-icon' />
				<h2 className='new-alert-two'>Correct!!!</h2>
				<p className='f-bold'>You have earned {props.earnedPoints} points</p>
				<p className='f-bold'>
					Total: {props.score + props.earnedPoints} points
				</p>
				<button onClick={theAnswerIsTrue} className='default-button'>
					NEXT QUESTION
				</button>
			</div>
		</div>
	);
};

export default CorrectAnswer;
