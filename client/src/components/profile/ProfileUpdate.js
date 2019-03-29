import React from "react";
import { Link } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";


const styles = {
    Limite: {
        width:"1000px",
        margin: "auto"
    }
  };


class ProfileUpdate extends React.Component {
  state = {};

  render() {
    const { errors } = this.state;

    return (
    <div style={styles.Limite}>
        <div class="container">
            <div class="span3 well">
                <center>
                    <img src="http://chittagongit.com//images/google-user-icon/google-user-icon-7.jpg" name="userpic" width="140" height="140" class="img-circle"/>
                    <h3>User Name</h3>
                    <em>Student</em>
		        </center>
            </div>
        </div>



        <hr/>

        <div className="container">
            <div className="row">
                <div className="col-md-3 ">
                    <div className="list-group ">
                    <Link className="list-group-item list-group-item-action active" to="/profileUpdate">Profile</Link>
                    <Link className="list-group-item list-group-item-action" to="/education">Education</Link>
                      <Link className="list-group-item list-group-item-action" to="/experience">Experience</Link>
                    </div> 
                </div>
                <div className="col-md-9">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <h4>Profile</h4>
                                    <hr></hr>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <form>
                                    <div className="form-group row">
                                        <label for="name" className="col-4 col-form-label">First Name</label> 
                                        <div className="col-8">
                                        <TextFieldGroup
                                            placeholder="First Name"
                                            name="firstName"
                                            //value={this.state.}
                                            //onChange={this.onChange}
                                            //error={errors.}
                                        />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label for="lastname" className="col-4 col-form-label">Last Name</label> 
                                        <div className="col-8">
                                        <TextFieldGroup
                                            placeholder="Last Name"
                                            name="lastName"
                                            //value={this.state.}
                                            //onChange={this.onChange}
                                            //error={errors.}
                                        />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label for="email" className="col-4 col-form-label">Email*</label> 
                                        <div className="col-8">
                                        <TextFieldGroup
                                            placeholder="Email"
                                            name="email"
                                            //value={this.state.}
                                            //onChange={this.onChange}
                                            //error={errors.}
                                        />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label for="occupation" className="col-4 col-form-label">Occupation</label> 
                                        <div className="col-8">
                                            <div className="form-check form-check-inline">
                                                <div className="checkbox">
                                                    <label data-toggle="collapse" data-target="#student" aria-expanded="true" aria-controls="student">
                                                    <input type="checkbox" defaultChecked/>Are you Student?</label>
                                                </div>                             
                                            </div>
                                            <div id="student" className="collapse show">
                                                <div className="well">
                                                    <TextFieldGroup
                                                        placeholder="Student ID"
                                                        name="studentid"
                                                        //value={this.state.}
                                                        //onChange={this.onChange}
                                                        //error={errors.}
                                                    />
                                                </div>
                                            </div>
                                            <div id="student" className="collapse">
                                                <div className="well">
                                                    <TextFieldGroup
                                                        placeholder="Teacher ID"
                                                        name="teacherid"
                                                        //value={this.state.}
                                                        //onChange={this.onChange}
                                                        //error={errors.}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label for="newpass" className="col-4 col-form-label">New Password</label> 
                                        <div className="col-8">
                                        <TextFieldGroup
                                            placeholder="New Password"
                                            name="newpass"
                                            //value={this.state.}
                                            //onChange={this.onChange}
                                            //error={errors.}
                                        />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label for="confirmpass" className="col-4 col-form-label">Confirm Password</label> 
                                        <div className="col-8">
                                        <TextFieldGroup
                                            placeholder="Confirm Password"
                                            name="confirmpass"
                                            //value={this.state.}
                                            //onChange={this.onChange}
                                            //error={errors.}
                                        />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="offset-4 col-8">
                                        <button name="submit" type="submit" className="btn btn-primary">Update My Profile</button>
                                        </div>
                                    </div>
                                    </form>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
  }
}


export default ProfileUpdate;
