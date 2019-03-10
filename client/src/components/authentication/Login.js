import React from "react";
import { Link } from "react-router-dom";

class Login extends React.Component {
  state = {};

  render() {
    return (
      <div className="container text-center">
        <Link style={styles.Logo} to="/">TeleQuest</Link>
        <div className="card">
          <div className="text-white bg-primary mb-3">
            <div className="card-header text-center">LOGIN</div>
          </div>
          <div>
            <div className="card-body">
              <form>
					      <div class="input-group form-group">
						      <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fas fa-user"></i></span>
                  </div>
                  <input type="text" class="form-control" placeholder="Email"/> 
                </div>
                <div class="input-group form-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fas fa-key"></i></span>
                  </div>
                  <input type="password" class="form-control" placeholder="Password"/>
                </div>
                <div class="form-group">
                  <input type="submit" value="Login" class="btn btn-primary btn-lg btn-block login-button"/>
                </div>
              </form>
            </div>
            <div>
              New Here? <Link to="/register">Create an account</Link>
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

export default Login;
