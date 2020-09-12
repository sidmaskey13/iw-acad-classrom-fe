import React, {Component, useState} from 'react';
import {Checkbox, Container, Form} from "semantic-ui-react";
import {addQuestionOption} from "../../redux/quiz/action";
import {connect} from "react-redux";
import {Link, Redirect} from "react-router-dom";


class AddQuestionOptionDynamic extends Component{
    state={
        inputFields:[{
            question:"",
            option1_correct:false,
            option2_correct:false,
            option3_correct:false,
            option4_correct:false,
            option1:'',
            option2:'',
            option3:'',
            option4:'',
            option:'',
            quiz : this.props.match && this.props.match.params && this.props.match.params.id
        }],
        quiz : this.props.match && this.props.match.params && this.props.match.params.id
    };
    setInputFields=(values)=>{
        this.setState({
            inputFields:values
        })
    };

    handleAddFields = () => {
        const values = [...this.state.inputFields];
        values.push({
            question:"",
            option1_correct:false,
            option2_correct:false,
            option3_correct:false,
            option4_correct:false,
            option1:'',
            option2:'',
            option3:'',
            option4:'',
            option:'',
            quiz : this.props.match && this.props.match.params && this.props.match.params.id
        });
        this.setInputFields(values);
    };

    handleRemoveFields = index => {
        const values = [...this.state.inputFields];
        values.splice(index, 1);
        this.setInputFields(values);
    };

    handleInputChange = (index, event) => {
        console.log(event.target)
        const values = [...this.state.inputFields];
        this.setState({selected: !this.state.selected})
        if (event.target.name === "option1") {values[index].option1 = event.target.value}
        if (event.target.name === "option2") {values[index].option2 = event.target.value}
        if (event.target.name === "option3") {values[index].option3 = event.target.value}
        if (event.target.name === "option4") {values[index].option4 = event.target.value}
        if (event.target.name === "question") {values[index].question = event.target.value}
        if (event.target.name === `option~${index}`) {
            values[index].option = event.target.value
            values[index].option1_correct = false
            values[index].option2_correct = false
            values[index].option3_correct = false
            values[index].option4_correct = false
            if (values[index].option === "option1_correct") {values[index].option1_correct = true}
            if (values[index].option === "option2_correct") {values[index].option2_correct = true}
            if (values[index].option === "option3_correct") {values[index].option3_correct = true}
            if (values[index].option === "option4_correct") {values[index].option4_correct = true}
        }
        this.setInputFields(values);
    };

    handleSubmit = e => {
        e.preventDefault();
        console.log("inputFields", this.state.inputFields);
        this.props.addQuestionOption(this.state.inputFields)
        this.setState({
            inputFields:[{
                question:"",
                option1_correct:false,
                option2_correct:false,
                option3_correct:false,
                option4_correct:false,
                option1:'',
                option2:'',
                option3:'',
                option4:'',
                option:''
            }],
        })
    };
    handleChange=(e)=>{
        console.log(e.target)
        this.setState({
            [e.target.name]:e.target.value
        })
    };

    render() {
        const {quiz}=this.state
        if(!this.props.isAuthenticated){
            return <Redirect to="/"/>
        }
        return (
            <Container className="mt-1">
                <Link
                    className='btn btn-secondary'
                    to={{
                        pathname: `/quiz/questions/${quiz}`,
                        data: quiz
                    }}>
                    Back
                </Link>
                <h1>Add Question Option</h1>
                <Form onSubmit={this.handleSubmit}>
                        {this.state.inputFields.map((inputField, index) => (
                            <div key={`${inputField}~${index}`}>
                                <Form.Input fluid label='Question' id="question"
                                            name="question"
                                            value={inputField.question}
                                            onChange={event => this.handleInputChange(index, event)}/>
                                <Form.Group widths='equal'>
                                    <Form.Input fluid label='Option 1' id="option1"
                                        name="option1"
                                        value={inputField.option1}
                                        onChange={event => this.handleInputChange(index, event)}/>

                                    <Form.Input fluid label='Option 2' id="option2"
                                                name="option2"
                                        value={inputField.option2}
                                        onChange={event => this.handleInputChange(index, event)}/>
                                </Form.Group>

                                <Form.Group widths='equal'>
                                    <Form.Input fluid label='Option 3' id="option3"
                                        name="option3"
                                        value={inputField.option3}
                                        onChange={event => this.handleInputChange(index, event)}/>
                                    <Form.Input fluid label='Option 4' id="option4"
                                                name="option4"
                                                value={inputField.option4}
                                                onChange={event => this.handleInputChange(index, event)}/>
                                </Form.Group>
                                <div>
                                    <h5>Correct Options</h5>
                                    <input type="radio" id="option1_correct" name={`option~${index}`} value="option1_correct" onChange={event => this.handleInputChange(index, event)}/>
                                    <label htmlFor="option1_correct">Option 1</label><br/>
                                    <input type="radio" id="option2_correct" name={`option~${index}`} value="option2_correct" onChange={event => this.handleInputChange(index, event)}/>
                                    <label htmlFor="option2_correct">Option 2</label><br/>
                                    <input type="radio" id="option3_correct" name={`option~${index}`} value="option3_correct" onChange={event => this.handleInputChange(index, event)}/>
                                    <label htmlFor="option3_correct">Option 3</label><br/>
                                    <input type="radio" id="option4_correct" name={`option~${index}`} value="option4_correct" onChange={event => this.handleInputChange(index, event)}/>
                                    <label htmlFor="option4_correct">Option 4</label><br/>
                                </div>


                                <div className="form-group col-sm-2">
                                    <button
                                        className="btn btn-link"
                                        type="button"
                                        onClick={() => this.handleRemoveFields(index)}
                                    >
                                        Delete Form
                                    </button>
                                    <button
                                        className="btn btn-link"
                                        type="button"
                                        onClick={() => this.handleAddFields()}
                                    >
                                        Add Form
                                    </button>
                                </div>
                            </div>
                        ))}
                    <div className="submit-button">
                        <button
                            className="btn btn-primary mr-2"
                            type="submit"
                            onSubmit={this.handleSubmit}
                        >
                            Save
                        </button>
                    </div>
                    <br/>
                    <pre>
          {JSON.stringify(this.state.inputFields, null, 2)}
        </pre>
                </Form>
            </Container>
        );
    }
}
const mapStateToProps=state=>({
    isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps,{addQuestionOption})(AddQuestionOptionDynamic);