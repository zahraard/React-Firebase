import React, { Component } from "react";
import FormFields from "../UI/formFields";
import { ValidData } from "../UI/Misc";
import { firebase } from "../../firebase";
class SignIn extends Component {
  state = {
    formdata: {
      email: {
        element: "input",
        value: "",
        config: {
          name: "email_input",
          placeholder: "Enter your email",
          type: "email"
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        validationMessage: ""
      },
      password: {
        element: "input",
        value: "",
        config: {
          name: "password_input",
          placeholder: "Enter your password",
          type: "password"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: ""
      }
    },
    formError: false,
    formSuccess: ""
  };

  updateForm = element => {
    const newFormdata = { ...this.state.formdata };
    const newElement = { ...newFormdata[element.id] };
    newElement.value = element.event.target.value;

    const validData = ValidData(newElement);
    newElement.valid = validData[0];
    newElement.validationMessage = validData[1];

    newFormdata[element.id] = newElement;
    this.setState({ formError: false, formdata: newFormdata });
  };
  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = {};
    let formIsValid = true;

    for (let key in this.state.formdata) {
      dataToSubmit[key] = this.state.formdata[key].value;
      formIsValid = this.state.formdata[key].valid && formIsValid;
    }
    if (formIsValid) {
      //check email and pass
      firebase
        .auth()
        .signInWithEmailAndPassword(dataToSubmit.email, dataToSubmit.password)
        .then(() => {
          this.props.history.push("/dashboard");
        })
        .catch(error => {
          this.setState({ formError: true });
        });
      console.log(dataToSubmit);
    } else {
      //return err
      this.setState({ formError: true });
    }
  };

  render() {
    return (
      <div className="container">
        <div className="signin_wrapper" style={{ margin: "100px" }}>
          <form onSubmit={event => this.submitForm(event)}>
            <h2>Please Login</h2>
            <FormFields
              id={"email"}
              formdata={this.state.formdata.email}
              change={element => this.updateForm(element)}
            />
            <FormFields
              id={"password"}
              formdata={this.state.formdata.password}
              change={element => this.updateForm(element)}
            />
            {this.state.formError ? (
              <div className="error_label">
                Something went wrong, try again!
              </div>
            ) : null}
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    );
  }
}

export default SignIn;
