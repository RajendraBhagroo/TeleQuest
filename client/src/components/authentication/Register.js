import React from "react";
import { Link } from "react-router-dom";

class Register extends React.Component {
  state = {};

  render() {
    return (
      <div className="container text-center">
        <Link style={styles.Logo} to="/">TeleQuest</Link>
        <div className="card">
          <div className="text-white bg-primary mb-3">
            <div className="card-header text-center">REGISTER</div>
          </div>
          <div>
            <div class="card-body">
              <form class="form-horizontal" method="post" action="#">
                <div class="form-group">
                  <label for="firstname" class="cols-sm-2 control-label">Frist Name</label>
                  <div class="cols-sm-10">
                    <div class="input-group">
                      <span class="input-group-addon"><i class="fa fa-user fa" aria-hidden="true"></i></span>
                      <input type="text" class="form-control" name="firstname" id="firstname" placeholder="Enter your First Name" />
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label for="lastname" class="cols-sm-2 control-label">Last Name</label>
                  <div class="cols-sm-10">
                    <div class="input-group">
                      <span class="input-group-addon"><i class="fa fa-user fa" aria-hidden="true"></i></span>
                      <input type="text" class="form-control" name="lastname" id="lastname" placeholder="Enter your Last Name" />
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label for="email" class="cols-sm-2 control-label">Email</label>
                  <div class="cols-sm-10">
                    <div class="input-group">
                      <span class="input-group-addon"><i class="fa fa-envelope fa" aria-hidden="true"></i></span>
                      <input type="text" class="form-control" name="email" id="email" placeholder="Enter your Email" />
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label for="password" class="cols-sm-2 control-label">Password</label>
                  <div class="cols-sm-10">
                    <div class="input-group">
                      <span class="input-group-addon"><i class="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                      <input type="password" class="form-control" name="password" id="password" placeholder="Enter your Password" />
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label for="confirm" class="cols-sm-2 control-label">Confirm Password</label>
                  <div class="cols-sm-10">
                    <div class="input-group">
                      <span class="input-group-addon"><i class="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                      <input type="password" class="form-control" name="confirm" id="confirm" placeholder="Confirm your Password" />
                    </div>
                  </div>
                </div>
                <div class="form-group ">
                  <button type="button" class="btn btn-primary btn-lg btn-block login-button">Register</button>
                </div>
                <div class="login-register">
                  Already have an account? <Link to="/login">Login</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  Logo:{
      fontSize: 50,
      color: "orange"
  }
};

export default Register;
