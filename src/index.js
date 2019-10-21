import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bulma/css/bulma.css'; 

const test_question = 'Are you a utilitarian?';

class Question extends React.Component {
	render() {
		return (
			<div className='question_answer_container'>
				<div className='question'>
					{test_question} 
				</div>
			
				<div className='answers'>
					<button
				 	className='yes-util'
                 	onClick={() => this.setState({util: 1})}
  					>
						Yes
					</button>

					<button
					className='no-util'
					onClick={() => this.setState({util: 0})}
					>
						No
					</button>
				</div>
			</div>
		);
	}
}
			


class Questions extends React.Component {
	renderQuestion() {
    	return <Question />;
	}	

	render() {
	 return (<div>
		{this.renderQuestion()}
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
