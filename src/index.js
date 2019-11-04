import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bulma/css/bulma.css'; 
import { questions_data } from './data.js';

let user_profile = {
	util: .5,
}

class Questions extends React.Component {
	renderQuestion(question) {
    	return (
			<div className='question_answer_container'>
                <div className='question'>
                    {question.text}
                </div>

                <div className='answers'>
                    <button
                    className='yes-util'
                    onClick={() => user_profile.util = 1}
                    >   
                        {question.answers[0]}
                    </button>

                    <button
                    className='no-util'
                    onClick={() => user_profile.util = 0}
                    >   
                        {question.answers[1]}
                    </button>
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
