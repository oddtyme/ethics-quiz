import React from 'react';
import ReactDOM from 'react-dom';
import { questions_data } from './data.js';
import 'bootstrap/dist/css/bootstrap.min.css';

let user_profile = {
	util: .5,
}

class Questions extends React.Component {
	renderQuestion(question) {
		const answer_list = question.answers.map((answer) => <label><input type="radio" id={answer} name={question.id} / >{answer}</label>); 
    	return (
			<div className='question_answer_container'>
                <div className='question'>
                    {question.text}
                </div>

                <div className='answers'>
					{answer_list}
                </div>
            </div>
		);
	}	

	render() {
	 	const question_list = questions_data.map((question) => <div>{this.renderQuestion(question)}</div>);
	 	return (<div className='questions'>
					{question_list}
	 			</div>);
		}
}

class SubmitButton extends React.Component {
	constructor(props) {
		super(props);
		
		this.submitQuiz = this.submitQuiz.bind(this);
	}
	submitQuiz() {
		console.log("Test");
	}

	render() {
		return (<button onClick={this.submitQuiz}>
					Submit
				</button>
		);
	}
}
		
class App extends React.Component {
	render() {
		return (
			<div className="app">
				<div className="questions_container">
					<Questions />
				</div>
				<div className="button_container">
					<SubmitButton />
				</div>
			</div>
		);
	}
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
);
