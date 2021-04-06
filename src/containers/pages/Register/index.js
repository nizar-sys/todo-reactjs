import React, { Component, Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "../../../components/atoms/Button";
import { connect } from "react-redux";
import { registerUser } from "../../../config/redux/action";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Swal from "sweetalert2";

class Register extends Component {
  state = {
    email: "",
    password: "",
  };
  handleChangeText = (e) => {
    // console.log(e.target.id);
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  handleRegister = async () => {
    let { email, password } = this.state;
    const { history } = this.props;
    const res = await this.props
      .registerApi({ email, password })
      .catch((err) => err);
    if (res) {
      this.setState({
        email: "",
        password: "",
      });
      Swal.fire({
        icon: "success",
        text: "Register success",
      });
      history.push("/");
    }
  };
  render() {
    return (
      <Fragment>
        <p>Register page</p>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <input
                type="text"
                id="email"
                className="form-control"
                placeholder="New email"
                value={this.state.email}
                onChange={this.handleChangeText}
              />
              <input
                type="password"
                id="password"
                className="form-control mt-2"
                placeholder="New password"
                value={this.state.password}
                onChange={this.handleChangeText}
              />
            </div>
          </div>
          <Button
            onClick={this.handleRegister}
            title="Register"
            loading={this.props.isLoading}
          />
        </div>
        Have account ? <Link to="/">Login</Link>
      </Fragment>
    );
  }
}

const reduxState = (state) => ({
  isLoading: state.isLoading,
});

const reduxDispatch = (dispatch) => ({
  registerApi: (data) => dispatch(registerUser(data)),
});
export default connect(reduxState, reduxDispatch)(Register);
