import { CircularProgress } from '@mui/material';
import { decode } from 'html-entities';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import CorrectAnswer from '../components/CorrectAnswer';
import useAxios from '../hooks/useAxios';
import { handleScoreChange } from '../redux/actions';

const getRandomInt = (max) => {
	return Math.floor(Math.random() * Math.floor(max));
};

const Questions = () => {
	const { question_category, question_difficulty, amount_of_question, score } =
		useSelector((state) => state);
	const history = useHistory();
	const dispatch = useDispatch();

	let apiUrl = `/api.php?amount=${amount_of_question}`;
	if (question_category) {
		apiUrl = apiUrl.concat(`&category=${question_category}`);
	}
	if (question_difficulty) {
		apiUrl = apiUrl.concat(`&difficulty=${question_difficulty}`);
	}
	apiUrl = apiUrl.concat(`&type=multiple`);

	const { response, loading } = useAxios({ url: apiUrl });
	const [questionIndex, setQuestionIndex] = useState(0);
	const [options, setOptions] = useState([]);
	const [counter, setCounter] = useState(15);
	const [theAnswerIsTrue, setTheAnswerIsTrue] = useState(false);
	const [isJokerUsed, setIsJokerUsed] = useState(false);
	const [isDisabled, setIsDisabled] = useState(false);
	const [earnedPoints, setEarnedPoints] = useState(0);

	useEffect(() => {
		if (response?.results.length) {
			const question = response.results[questionIndex];
			let answers;
			if (isJokerUsed) {
				answers = [...question.incorrect_answers.splice(0, 1)];
			} else {
				answers = [...question.incorrect_answers];
			}
			answers.splice(
				getRandomInt(question.incorrect_answers.length),
				0,
				question.correct_answer
			);
			setOptions(answers);
		}
	}, [response, questionIndex, isJokerUsed]);

	useEffect(() => {
		if (counter > 0 && !theAnswerIsTrue) {
			const interval = setInterval(() => {
				setCounter((prevCounter) => prevCounter - 1);
			}, 1000);
			return () => clearInterval(interval);
		}
	}, [counter, theAnswerIsTrue]);

	if (loading) {
		return (
			<div className='row'>
				<CircularProgress className='centered-column mt-200' />
			</div>
		);
	}

	const handleClickAnswer = (e) => {
		setIsJokerUsed(false);
		const question = response.results[questionIndex];
		if (e.target.textContent === question.correct_answer) {
			if (counter > 10 && counter <= 15) {
				setEarnedPoints(200);
				dispatch(handleScoreChange(score + earnedPoints));
			} else if (counter > 5 && counter <= 10) {
				setEarnedPoints(100);
				dispatch(handleScoreChange(score + earnedPoints));
			} else {
				setEarnedPoints(50);
				dispatch(handleScoreChange(score + earnedPoints));
			}
			setTheAnswerIsTrue(true);
		} else {
			history.push('/wrong-answer');
			setTheAnswerIsTrue(false);
		}
		if (questionIndex + 1 < response.results.length) {
			setQuestionIndex(questionIndex + 1);
		} else {
			history.push('/score');
		}
	};
	const useJoker = () => {
		setIsJokerUsed(true);
		setIsDisabled(true);
	};

	if (counter === 0) {
		history.push('/time-is-up');
	}
	const trueAnswer = (isTrueAnswer) => {
		setTheAnswerIsTrue(false);
	};
	const resetCount = (resetCount) => {
		setCounter(15);
	};

	return (
		<div className='content-row'>
			<div className='full-container'>
				<div className='questions-header'>
					<div className='header-information'>
						Questions {questionIndex + 1} / {response.results.length}
					</div>
					<div className='header-information'>
						<p className='mb-0'>Score</p>
						<p className='mt-0'>{score + earnedPoints}</p>
					</div>
					<div className='header-information'>Remaining Time: {counter}</div>
				</div>
			</div>
			{!theAnswerIsTrue && (
				<div className='centered-column'>
					<p className='f-bold mt-30 mb-50'>
						{decode(response.results[questionIndex].question)}
					</p>
					{options.map((data, id) => (
						<div key={id} className='options' onClick={handleClickAnswer}>
							{decode(data)}
						</div>
					))}
					<button
						onClick={useJoker}
						disabled={isDisabled}
						className='default-button joker-button'>
						USE JOKER
					</button>
				</div>
			)}

			{theAnswerIsTrue && (
				<CorrectAnswer
					score={score}
					questionIndex={questionIndex + 1}
					trueAnswer={trueAnswer}
					earnedPoints={earnedPoints}
					resetCount={resetCount}
				/>
			)}
		</div>
	);
};

export default Questions;
