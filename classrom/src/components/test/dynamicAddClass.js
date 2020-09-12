import React, {Component, useState} from 'react';


class DynamicAddClass extends Component{
    state={
        inputFields:[{firstName: '', lastName: '',class:''}]
    };
    setInputFields=(values)=>{
        this.setState({
            inputFields:values
        })
    };

    handleAddFields = () => {
        const values = [...this.state.inputFields];
        values.push({firstName: '', lastName: '',class:''});
        this.setInputFields(values);
    };

    handleRemoveFields = index => {
        const values = [...this.state.inputFields];
        values.splice(index, 1);
        this.setInputFields(values);
    };

    handleInputChange = (index, event) => {
        const values = [...this.state.inputFields];
        if (event.target.name === "firstName") {values[index].firstName = event.target.value}
        if (event.target.name === "lastName") {values[index].lastName = event.target.value}
        if (event.target.name === "class") {values[index].class = event.target.value}
        this.setInputFields(values);
    };

    handleSubmit = e => {
        e.preventDefault();
        console.log("inputFields", this.state.inputFields);
    };
    
    render() {
        return (
            <div>
                <h1>Dynamic Form Fields in React</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-row">
                        {this.state.inputFields.map((inputField, index) => (
                            <div key={`${inputField}~${index}`}>
                                <div className="form-group col-sm-6">
                                    <label htmlFor="firstName">First Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="firstName"
                                        name="firstName"
                                        value={inputField.firstName}
                                        onChange={event => this.handleInputChange(index, event)}
                                    />
                                </div>
                                <div className="form-group col-sm-4">
                                    <label htmlFor="lastName">Last Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="lastName"
                                        name="lastName"
                                        value={inputField.lastName}
                                        onChange={event => this.handleInputChange(index, event)}
                                    />
                                </div>
                                <div className="form-group col-sm-4">
                                    <label htmlFor="lastName">Class</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="class"
                                        name="class"
                                        value={inputField.class}
                                        onChange={event => this.handleInputChange(index, event)}
                                    />
                                </div>
                                <div className="form-group col-sm-2">
                                    <button
                                        className="btn btn-link"
                                        type="button"
                                        onClick={() => this.handleRemoveFields(index)}
                                    >
                                        -
                                    </button>
                                    <button
                                        className="btn btn-link"
                                        type="button"
                                        onClick={() => this.handleAddFields()}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
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
                </form>
            </div>
        );
    }


}
export default DynamicAddClass;