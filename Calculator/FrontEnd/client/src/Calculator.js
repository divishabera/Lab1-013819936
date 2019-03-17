import React from 'react';
import update from 'react-addons-update';
import ClientFetch from './utils/ClientFetch';

class Calculator extends React.Component {
	constructor(props) {
		super(props);
		this.calculateNow = this.calculateNow.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.fetchPathValue = this.fetchPathValue.bind(this);
		this.formValidate = this.formValidate.bind(this);
		this.state = {
			result: "",
			input: {
				A_number: "",
				operation: "",
				B_number: "",
			
			}
		};
		

	}


	fetchPathValue() {
		var path_Value = "";
		switch (this.state.input.operation) {
			case "ADD":
				path_Value = "addNumbers";
				break;
			case "SUB":
				path_Value = "subNumbers";
				break;
			case "MUL":
				path_Value = "mulNumbers";
				break;
			case "DIV":
				path_Value = "divNumbers";
				break;
			default:
				path_Value = "";
		}
		return path_Value;
	}

	
	handleInputChange(event) {
		var newState = { input: {} };
		newState.input[event.target.name] = { $set: event.target.value };

		this.setState(update(this.state, newState));
	}


	calculateNow(eve) {
		eve.preventDefault();
		

		if (!this.formValidate())// we validate
		{
			return false;
		}


		var clientFetch = new ClientFetch();
		var apiPath = this.fetchPathValue();
		clientFetch.fetch(apiPath + '?a=' + this.state.input.A_number + '&b=' + this.state.input.B_number, { method: "GET" })
			.then(res => {
				var newState = {};
				newState["result"] = { $set: res.result };

				this.setState(update(this.state, newState));
				return true;
			})
			.catch(error => {
				throw error;
			});
	}

	formValidate() {
	
		if (this.state.input.A_number === "") {
			alert("Please provide first number");
			return false;
		}
		if (this.state.input.B_number === "") {
			alert("Please provide second number");
			return false;
		}
		if (this.state.input.operation === "") {
			alert("Please select an operation");
			return false;
		}
		return true;
	}


	render() {
		return (
			<div class="container">
				<h3> Calculator</h3>
				<form  >

					<div class="form-group">
						<label for="uu">First Number: </label>
						<input type="number" name="A_number" onChange={this.handleInputChange} required="required" class="form-control" id="uu" />

					</div>

					<div>
						<input type="radio" id="operation1" name="operation" value="ADD" onChange={this.handleInputChange} />
						<label className="operation_class">+</label>

						<input type="radio" id="operation2" name="operation" value="SUB" onChange={this.handleInputChange} />
						<label className="operation_class">-</label>

						<input type="radio" id="operation3" name="operation" value="MUL" onChange={this.handleInputChange} />
						<label className="operation_class">x</label>

						<input type="radio" id="operation3" name="operation" value="DIV" onChange={this.handleInputChange} />
						<label className="operation_class">/</label>
					</div>
					<div class="form-group">
						<label for="xyz">Second Number: </label>
						<input type="number" name="B_number" onChange={this.handleInputChange} required="required" class="form-control" id="xyz" />

					</div>

					<button  class="btn btn-primary" id="FireButton" onClick={this.calculateNow}>Calculate</button>
				</form>
				<div>
					<span ><h4>Result: {this.state.result}</h4></span>
				</div>
			</div>

		)
	}
}

export default Calculator;
