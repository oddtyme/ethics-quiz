import React from 'react';
import ReactDOM from 'react-dom';
import { questions_data } from './data.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import styles from './styles.module.css';
import logo from '../public/favicon_package_v0.16/android-chrome-192x192.png'
import NavBar from 'react-bootstrap/Navbar';

let user_profile = {
	U  : 0, // utilitarian
	E  : 0, // egoist
	CG : 0, // common good
	D  : 0, // duty-based
	R  : 0, // rights
	F  : 0, // fairness
	W  : 0, // feminist
	V  : 0, // virtue
	T  : 0, // divine command
	qp : 0  // pointer that determines what question user is at
}

class Results extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let max = 0;
		let school_ot = '';
		// for loop should not include questions pointer
		for (const school in user_profile) {
			if (school === 'qp') {
				continue;
			} else if (user_profile[school] > max) {
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
				school_ot = 'on the fence, and just sitting. Answer more questions for a more conclusive verdict';
		}
		 
		return (
			<div>
				<div className='resultsStyle'>
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
			<div className="text">
                <div className="questionStyle">
                    {question.text}
                </div>

                <div className="answerStyle">
					{answer_list}
                </div>
            </div>
		);
	}	

	render() {
		// check whether or not we're out of questions
		if (user_profile.qp >= questions_data.length) {
			return (<div className='OutOfQuestions'>
						All out of questions!
					</div>);
		} else {
			// need to render first question for new user
	 		const init_question = this.renderQuestion(questions_data[user_profile.qp]);
	 		return (<div className='qa'>
						{init_question}
	 				</div>);
		}
	}
}

class ReturnButton extends React.Component {
	constructor(props) {
		super(props);

		this.returnQuiz = this.returnQuiz.bind(this);
	}
	returnQuiz() {
		this.props.switchState();
		/* for (let school in user_profile) {
			user_profile[school] = 0;
		} */
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
		
		this.submitQuestion = this.submitQuestion.bind(this);
	}
	submitQuestion() {
			let question = questions_data[user_profile.qp];
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
		this.props.newQuestion();
	}

	render() {
		return (<Button id="submit-button"  onClick={this.submitQuestion}>
					Next
				</Button>
		);
	}
}

class Toolbar extends React.Component {
	constructor(props) {
		super(props);

		this.switchState = this.switchState.bind(this);
	}
	
	switchState() {
		this.props.switchState();
	}

	render() {
		// if not submitted, generate profile instead of questions
		if (this.props.submitted === false) {
			return(
				<div className="headingStyle"><img src={logo} alt="Logo" width="75"/> parr ethics profiler
				<NavBar className="tabBackgroundStyle" variant="light">
					<Nav activeKey='questions' >
					<Nav.Item>
						<Nav.Link className="tabStyle" onSelect={this.switchState} eventKey="Profile">Profile</Nav.Link>
					</Nav.Item>						<Nav.Item>
						<Nav.Link href="https://parrcenter.unc.edu/" eventKey="ParrCenter" className="tabStyle">Parr Center</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link eventKey="Contact" className="tabStyle">Contact Us</Nav.Link>
					</Nav.Item>
					</Nav>
				</NavBar>
				</div>
			);
		// vice versa
		} else {
			return(
				<div className="headingStyle"><img src={logo} alt="Logo" width="75"/> parr ethics profiler
					<NavBar className="tabBackgroundStyle" variant="light">
						<Nav activeKey='answers' >
						<Nav.Item>
							<Nav.Link className="tabStyle" onSelect={this.switchState} eventKey="Questions">Questions</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link className="tabStyle" href="https://parrcenter.unc.edu/" eventKey="ParrCenter">Parr Center</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link eventKey="Contact" className="tabStyle">Contact Us</Nav.Link>
						</Nav.Item>
						</Nav>
					</NavBar>
				</div>
			);
		}
	}
}
		
class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			submitted: false,
			qp: user_profile.qp
		};
		this.switchState = this.switchState;
		this.newQuestion = this.newQuestion;
	}
	switchState = () => {
		this.setState ({submitted: !this.state.submitted});
	};
	
	newQuestion = () => {
		user_profile.qp = user_profile.qp + 1;
		this.setState ({submitted : false, qp: user_profile.qp});
	};
		

	render() {
		if (!this.state.submitted) {
			// if no questions available, don't generate next button
			if (questions_data.length === user_profile.qp) {
				return (
					<div className="app">
						<div className="toolbar_container">
							<Toolbar switchState={this.switchState} submitted={this.state.submitted} />
						</div>
						<div className="questions_container">
							<Questions />
						</div>
					</div>
				);
			// otherwise, generate app and next button	
			} else {
				return(		
					<div className="app">
						<div className="toolbar_container">
							<Toolbar switchState={this.switchState} submitted={this.state.submitted} />
						</div>
						<div className="questions_container">
							<Questions />
						</div>
						<div className="button_container">
							<SubmitButton newQuestion={this.newQuestion} submitted={this.state.submitted} />
						</div>
					</div>
				);
			}
		} else {
			return (
				<div className="app">
					<div className="toolbar_container">
						<Toolbar switchState={this.switchState} submitted={this.state.submitted} />
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
