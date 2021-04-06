import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Button from "../../../components/atoms/Button";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { actionUserName, loginUser } from "../../../config/redux/action";

class Login extends Component {
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
  handleLogin = async () => {
    let { email, password } = this.state;
    const { history } = this.props;
    const res = await this.props
      .loginApi({ email, password })
      .catch((err) => err);
    if (res) {
      console.log("success", res);
      localStorage.setItem("userData", JSON.stringify(res));
      this.setState({
        email: "",
        password: "",
      });
      // redirect ke dashboard
      history.push("/dashboard");
    } else {
      console.log("failed");
    }
  };
  render() {
    return (
      <Fragment>
        <p>Login page</p>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <input
                type="text"
                id="email"
                className="form-control"
                placeholder="Your email"
                value={this.state.email}
                onChange={this.handleChangeText}
              />
              <input
                type="password"
                id="password"
                className="form-control mt-2"
                placeholder="Your password"
                value={this.state.password}
                onChange={this.handleChangeText}
              />
            </div>
          </div>
          <Button
            onClick={this.handleLogin}
            title="Login"
            loading={this.props.isLoading}
          />
        </div>
        Not have account ? <Link to="/register">Register</Link>
      </Fragment>
    );
  }
}

const reduxState = (state) => ({
  isLoading: state.isLoading,
});

const reduxDispatch = (dispatch) => ({
  loginApi: (data) => dispatch(loginUser(data)),
});
export default connect(reduxState, reduxDispatch)(Login);
