import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const styles = {
  Limite: {
      width:"1000px",
      margin: "auto"
  }
};

class Profile extends React.Component {
  state = {};

  render() {
    const { userName } = this.props.auth.user;
    const { user } = this.props.auth;

    return (
      <div style={styles.Limite}>




        <div className="container">
          <br/>
          <div className="row">
      		  <div className="col-sm-10">
              <h1>{userName}</h1>
            </div>
          </div>
          <br/>

          <div className="row">
  		      <div className="col-sm-3">

              <div className="text-center">
                <img
                className="rounded-circle ml-2"
                src={user.avatar}
                alt={user.userName}
                title="You must have a Gravatar connected to your email to display an image"
                />
              </div>
      
              <br/>
          
              <div className="card">
                <div className="card-header">
                  <strong>Course</strong>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">CSCI 455</li>
                  <li className="list-group-item">IENG 320</li>
                  <li className="list-group-item">IENG 400</li>
                </ul>
              </div>
              <br/>

              <div className="card">
                <div className="card-header">
                  <strong>Social Media</strong>
                </div>
                <div className="card-body">
                  <Link to="#" className="card-link">Youtube</Link><br/>
                  <Link to="#" className="card-link">Twitter</Link><br/>
                  <Link to="#" className="card-link">Linked in</Link><br/>
                  <Link to="#" className="card-link">Facebook</Link><br/>
                  <Link to="#" className="card-link">Instagram</Link><br/>
                  <Link to="#" className="card-link">Github</Link>
                </div>
              </div>
              <br/>

            </div>


    	      <div className="col-sm-9">
              <ul className="nav nav-tabs" role="tablist">
                  <li className="nav-item">
                    <Link className="nav-link active" id="profile" data-toggle="tab" role="tab" aria-controls="profile" aria-selected="true" href="#Profile" to="">Profile</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" id="expereince" data-toggle="tab" role="tab" aria-controls="experince" aria-selected="false"  href="#Experience" to="">Experience</Link>
                  </li>
              </ul>
              <br/>

              
              <div className="tab-content">
                <div className="tab-pane fade show active" role="tabpanel" id="Profile">
                  <form className="form" action="##" method="post" id="profilePage">

                    <div className="form-group row">  
                      <div className="col">
                        <h5>First name</h5>
                        <h6 className="font-weight-light">Myeongkeun</h6>
                      </div>
                      <div className="col">
                        <h5>Last name</h5>
                        <h6 className="font-weight-light">Kim</h6>
                      </div>
                    </div>
                    <br/>

                    <div className="form-group row">  
                      <div className="col">
                        <h5>Email</h5>
                        <h6 className="font-weight-light">mkim28@nyit.edu</h6>
                      </div>
                      <div className="col">
                        <h5>Ocupation</h5>
                        <h6 className="font-weight-light">Student</h6>
                      </div>
                    </div>
                    <br/>

                    <div className="form-group">
                      <h5>Bio</h5>
                      <h6 className="font-weight-light">This is just aa sample bio writing for the test. 
                      I don't know how to put actual data from database and don't even know what are the vlues in our data now.</h6>
                    </div>
                    <br/>

                    <div className="form-group">
                      <h5>Skills</h5>
                      <h6 className="font-weight-light">Skill list 1</h6>
                      <h6 className="font-weight-light">Skill list 2</h6>
                      <h6 className="font-weight-light">Skill list 3</h6>
                    </div>

              	  </form>
                  <br/>
                  <Link type="button" className="btn btn-primary pull-right" to="/profileUpdate">Update Profile</Link>
                </div>




                <div className="tab-pane fade" role="tabpanel" id="Experience">
                  <form className="form" action="##" method="post" id="experiencePage">
                  
                    <div className="form-group row">  
                        <div className="col">
                          <h5>Title</h5>
                          <h6 className="font-weight-light">Student</h6>
                        </div>
                        <div className="col">
                          <h5>Company</h5>
                          <h6 className="font-weight-light">NYIT</h6>
                        </div>
                    </div>
                    <br/>

                    <div className="form-group">
                      <h5>Location</h5>
                      <h6 className="font-weight-light">Northern Blvd, Old Westbury, NY 11568</h6>
                    </div>
                    <br/>

                    <div className="form-group">
                      <h5>Is It Your Current Job?</h5>
                      <h6 className="font-weight-light">No</h6>
                    </div>
                    <br/>




                    <div className="form-group">
                      <div className="col-xs-12">
                        <br/>
                        <button className="btn btn-lg btn-success pull-right" type="submit"><i className="glyphicon glyphicon-ok-sign"></i> Add New Experience</button>
                      </div>
                    </div>
              	  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
      
      </div>
    );
  }
}

Profile.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Profile);
