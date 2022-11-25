import React from "react";
class RegistrationForm extends React.Component {
  constructor() {
    super();
    this.state = {  
      fields: {},   
      errors: {},
      strength:{}
    }

    this.handleError = this.handleError.bind(this);  
    this.submitForm = this.submitForm.bind(this);
    this.analyze = this.analyze.bind(this);

  };
  analyze(event) {
      const strongRegex = new RegExp("^(?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.[!@#\$%\^&\*])(?=.{8,})");
      const mediumRegex = new RegExp("^(((?=.[a-z])(?=.[A-Z]))|((?=.[a-z])(?=.[0-9]))|((?=.[A-Z])(?=.[0-9])))(?=.{6,})");
    if(strongRegex.test(event.target.value)) {
        this.setState({ backgroundColor: "green" });
    } else if(mediumRegex.test(event.target.value)) {
        this.setState({ backgroundColor: "orange" });
    } else {
        this.setState({ backgroundColor: "red" });
    }
}

  handleError(e) {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields
    });
  

  }

  submitForm(e) {
  
    
    e.preventDefault();
    if (this.validateLogin()) {
        console.log(this.state);
         let fields = {};
         fields["username"] = "";
         fields["emailid"] = "";
         fields["password"] = "";
        this.setState({fields:fields});
        console.log(this.state);
        alert("Login Successfully");
    }

  }

  validateLogin() {

    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;
    let strength={};

    if (!fields["username"]) {
      formIsValid = false;
      errors["username"] = "Please Fill the Column";
    }

    if (typeof fields["username"] !== "undefined") {
      if (!fields["username"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["username"] = "Username invalid";
      }
    }

    if (!fields["emailid"]) {
      formIsValid = false;
      errors["emailid"] = "Invalid Email";
    }

    if (typeof fields["emailid"] !== "undefined") {
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+))|("[\w-\s]+")([\w-]+(?:\.[\w-]+)))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      var pattern = new RegExp();
      if (!pattern.test(fields["emailid"])) {
        formIsValid = false;
        errors["emailid"] = "Invalid Email";
      }
    }

    
    if (!fields["password"]) {
      formIsValid = false;
      errors["password"] = "Please Fill the Password";
    }

    if (typeof fields["password"] !== "undefined") {

      if (!fields["password"].match("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$")) {
        if(fields["password"].match("^(((?=.[a-z])(?=.[A-Z]))|((?=.[a-z])(?=.[0-9]))|((?=.[A-Z])(?=.[0-9])))(?=.{6,})"))
        errors["password"]="Medium strong";
        else if(fields["password"].match("^(((?=.[a-z])|(?=.[A-Z]))|((?=.[a-z])|(?=.[0-9]))|((?=.[A-Z])|(?=.[0-9])))|(?=.{6,})")){
            errors["password"]="Too weak";
        } 
        // formIsValid = false;
    }
    else{
        errors["password"] = "Strong password";
    }

    }

    this.setState({
      errors: errors
    });
    return formIsValid;
    
  }

render() {
  return (
  <div id="registration">
   <div id="register">
      <h3 className="title">Dynamic Form</h3>
      <div className="contain">
      <form method="post"  name="thisisregistrationForm"  onSubmit= {this.submitForm} >
      <label>Enter your username</label><br></br>
      <input type="text" name="username" value={this.state.fields.username} onChange={this.handleError} />
      <div className="errorMsg">{this.state.errors.username}</div><br></br>
      <label>Enter your email</label><br></br>
      <input type="email" name="emailid" value={this.state.fields.emailid} onChange={this.handleError}  />
      <div className="errorMsg">{this.state.errors.emailid}</div><br></br>
      <label>Enter your password</label><br></br>
      <input type="password" name="password" value={this.state.fields.password} onChange={this.handleError} />
      <div className="errorMsg">{this.state.errors.password}</div><br></br>

      <button>Submit</button>
      
      </form>
      </div>
  </div>
</div>

    );
}


}

export default RegistrationForm;
