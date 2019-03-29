import React from "react";
import { Link } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";

const styles = {
    Head: {
        paddingTop: "20px",
        marginbottom: "20px"
    },
    Img: {
        height:"150px",
        width:"150px",
        position: "absolute"
    },
    Limite: {
        width:"1000px",
        margin: "auto"
    }
  };

class Education extends React.Component {
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
                      <Link className="list-group-item list-group-item-action" to="/profileUpdate">Profile</Link>
                      <Link className="list-group-item list-group-item-action active" to="/education">Education</Link>
                      <Link className="list-group-item list-group-item-action" to="/experience">Experience</Link>
                      </div> 
                  </div>
                  <div className="col-md-9">
                      <div className="card">
                          <div className="card-body">
                              <div className="row">
                                  <div className="col-md-12">
                                      <h4>Education</h4>
                                      <hr></hr>
                                  </div>
                              </div>
                              <div className="row">
                                  <div className="col-md-12">
                                      <form>
                                      <div className="form-group row">
                                          <label for="school" className="col-4 col-form-label">School Name</label> 
                                          <div className="col-8">
                                          <TextFieldGroup
                                              placeholder="School Name"
                                              name="school"
                                              //value={this.state.}
                                              //onChange={this.onChange}
                                              //error={errors.}
                                          />
                                          </div>
                                      </div>
                                      <div className="form-group row">
                                          <label for="location" className="col-4 col-form-label">School Location</label> 
                                          <div className="col-8">
                                          <TextFieldGroup
                                              placeholder="School Location"
                                              name="location"
                                              //value={this.state.}
                                              //onChange={this.onChange}
                                              //error={errors.}
                                          />
                                          </div>
                                      </div>
                                    <div className="form-group row">
                                          <label for="degree" className="col-4 col-form-label">Degree</label> 
                                          <div className="col-8">
                                          <TextFieldGroup
                                              placeholder="Degree"
                                              name="degree"
                                              //value={this.state.}
                                              //onChange={this.onChange}
                                              //error={errors.}
                                          />
                                          </div>
                                    </div>
                                    <div className="form-group row">
                                          <label for="fieldOfStudy" className="col-4 col-form-label">Field of Study</label> 
                                          <div className="col-8">
                                          <TextFieldGroup
                                              placeholder="Field of Study"
                                              name="fieldOfStudy"
                                              //value={this.state.}
                                              //onChange={this.onChange}
                                              //error={errors.}
                                          />
                                          </div>
                                    </div>
                                    <div className="form-group row">
                                        <label for="isCurrent" className="col-4 col-form-label">Is It Your Current Job?</label> 
                                        <div className="col-8">
                                            <div className="form-check form-check-inline">
                                                <div className="checkbox">
                                                    <input type="checkbox"/> Yes
                                                </div>                             
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                          <label for="from" className="col-4 col-form-label">Working</label> 
                                          <div className="col-8">
                                          From:<br/><br/>
                                          <TextFieldGroup
                                              type="date"
                                              placeholder="DD/MM/YYYY"
                                              name="from"
                                              //value={this.state.}
                                              //onChange={this.onChange}
                                              //error={errors.}
                                          />
                                          To: <br/><br/>
                                          <TextFieldGroup
                                              type="date"
                                              placeholder="DD/MM/YYYY"
                                              name="to"
                                              //value={this.state.}
                                              //onChange={this.onChange}
                                              //error={errors.}
                                          />
                                          </div>
                                    </div>
                                    <div className="form-group row">
                                        <label for="description" className="col-4 col-form-label">Description</label> 
                                        <div className="col-8">
                                        <textarea id="description" name="description" cols="40" rows="4" className="form-control"></textarea>
                                        </div>
                                    </div>
                                      <div className="form-group row">
                                          <div className="offset-4 col-8">
                                          <button name="submit" type="submit" className="btn btn-primary">Update</button>
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
  
  export default Education;