import React from 'react';
import ReactDOM from 'react-dom';
import { questions_data } from './data.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';

let user_profile = {
	U  : 0, // utilitarian
	E  : 0, // egoist
	CG : 0, // common good
	D  : 0, // duty-based
	R  : 0, // rights
	F  : 0, // fairness
	T  : 0, // divine command
	W  : 0, // feminist
	V  : 0, // virtue
	T  : 0, // divine command
}

class Results extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let max = 0;
		let school_ot = '';
		for (const school in user_profile) {
			if (user_profile[school] > max) {
				max = user_profile[school];
				school_ot = school;
			} 
		}

		switch(school_ot) {
			case 'U':
				school_ot = 'a Utilitarian';
				break;
			case 'E':
				school_ot = 'an Egoist';
				break;
			case 'CG':
				school_ot = 'a Common Good Ethicist';
				break;
			case 'D':
				school_ot = 'a Duty-Based Ethicist';
				break;
			case 'R':
				school_ot = 'a Rights Ethicist';
				break;
			case 'F':
				school_ot = 'a Fairness Ethicist';
				break;
			case 'T':
				school_ot = 'a Divine Command Ethicist';
				break;
			case 'W':
				school_ot = 'a Feminist';
				break;
			case 'V':
				school_ot = 'a Virtue Ethicist';
				break;
			case 'T':
				school_ot = 'a Divine Command Ethicist';
				break;
			default:
				school_ot = 'an Ethical Agnostic';
		}
		 
		return (
			<div>
				<div className='Results'>
					{'You are ' + school_ot}
				</div>
				<div className='button-container'>
					<ReturnButton switchState={this.props.switchState}/>
				</div>
			</div>
		);
	}
}
				

class Questions extends React.Component {
	renderQuestion(question) {
		const answer_list = question.answers.map((answer) => <label><input type="radio" value={answer.key} name={question.id} / >{answer.key}</label>); 
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

class ReturnButton extends React.Component {
	constructor(props) {
		super(props);

		this.returnQuiz = this.returnQuiz.bind(this);
	}
	returnQuiz() {
		this.props.switchState();
		for (let school in user_profile) {
			user_profile[school] = 0;
		}
	}

	render() {
		return (<Button id="return-button" onClick={this.returnQuiz}>
					Return
				</Button>
		);
	}
}
		
class SubmitButton extends React.Component {
	constructor(props) {
		super(props);
		
		this.submitQuiz = this.submitQuiz.bind(this);
	}
	submitQuiz() {
		for (let j = 0; j < questions_data.length; j++) {
			let question = questions_data[j];
			let radios = document.getElementsByName(question.id);
			for (let i = 0, length = radios.length; i < length; i++) {
				if (radios[i].checked) {
					let val = radios[i].value;
					let schools = question.answers.find((answer) => {
						if (answer.key === val) {
							return answer;
						}
					}).value;
					for (let x = 0; x < schools.length; x++) {
						user_profile[schools[x].key] = user_profile[schools[x].key] + schools[x].value;
					}
					console.log(user_profile);
				}			
			}
		}		
		this.props.switchState();
	}

	render() {
		return (<Button id="submit-button"  onClick={this.submitQuiz}>
					Submit
				</Button>
		);
	}
}

class Toolbar extends React.Component {
	constructor(props) {
		super(props);

		this.profileSubmit = this.profileSubmit.bind(this);
	}
	
	profileSubmit() {
		for (let j = 0; j < questions_data.length; j++) {
			let question = questions_data[j];
			let radios = document.getElementsByName(question.id);
			for (let i = 0, length = radios.length; i < length; i++) {
				if (radios[i].checked) {
					let val = radios[i].value;
					let schools = question.answers.find((answer) => {
						if (answer.key === val) {
							return answer;
						}
					}).value;
					for (let x = 0; x < schools.length; x++) {
						user_profile[schools[x].key] = user_profile[schools[x].key] + schools[x].value;
					}
					console.log(user_profile);
				}			
			}
		}		
		this.props.switchState();
	}

	render() {
		return(
			<div className="toolbar-container">
				<Nav activeKey="/questions">
					<Nav.Item>
						<Nav.Link eventKey="Questions">Questions</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link onSelect={this.profileSubmit} eventKey="Profile">Profile</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link href="https://parrcenter.unc.edu/" eventKey="ParrCenter">Parr Center</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link eventKey="Contact">Contact Us</Nav.Link>
					</Nav.Item>
				</Nav>
			</div>
		);
	}
}
		
class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			submitted: false
		};
		this.switchState = this.switchState;
	}
	switchState = () => {
		this.setState ({submitted: !this.state.submitted});
	};

	render() {
		if (!this.state.submitted) {
			return(		
				<div className="app">
					<div className="toolbar_container">
						<Toolbar switchState={this.switchState} />
					</div>
					<div className="questions_container">
						<Questions />
					</div>
					<div className="button_container">
						<SubmitButton switchState={this.switchState}/>
					</div>
				</div>
			);
		} else {
			return (
				<div className="app">
					<div className="toolbar_container">
						<Toolbar />
					</div>
					<div className="results_container">
						<Results switchState={this.switchState} />
					</div>
				</div>
			);
		}
	}
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
);
