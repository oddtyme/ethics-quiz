import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bulma/css/bulma.css'; 
import { questions_data } from './data.js';

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
	 	return (<div>
					{question_list}
	 			</div>);
		}
}
		
class App extends React.Component {
	render() {
		return (
			<div className="app">
				<div className="questions_container">
					<Questions />
				</div>
			</div>
		);
	}
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
);
