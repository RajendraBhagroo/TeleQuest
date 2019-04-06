const host = process.env.HOST || `127.0.0.1`;
const port = process.env.PORT || 3001;
const request = require("supertest").agent(`${host}:${port}`);

let token = null;
let user_id = "";
let edu_id = "";
let exp_id = "";
let courseEnrolledIn_id = "";
let courseTeaching_id = "";

/*
 * @route   POST /api/v1/users/register
 * @params  {firstName, lastName, email, password, password2}
 * @desc    Register User
 * @access  Public
 */
describe("POST /api/v1/users/register", () => {
  const body = {
    firstName: "Taylor",
    lastName: "Swift",
    email: "TSwift@Nyit.edu",
    password: "123456",
    password2: "123456"
  };
  it("Should Respond With 201 Created [User Created]", done => {
    request
      .post("/api/v1/users/register")
      .set("Accept", "application/json")
      .send(body)
      .expect(201)
      .end(err => {
        if (err) return done(err);
        done();
      });
  });
});

/*
 * @route   POST /api/v1/users/login
 * @params  {email, password}
 * @desc    Logs In User, Save JWT Token
 * @access  Public
 */
describe("POST /api/v1/users/login", () => {
  const body = {
    email: "TSwift@Nyit.edu",
    password: "123456"
  };
  it("Should Respond With 200 OK [JWT Token Set]", done => {
    request
      .post("/api/v1/users/login")
      .set("Accept", "application/json")
      .send(body)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        else {
          token = res.body.token;
        }
        done();
      });
  });
});

/*
 * @route          GET /api/v1/users/current
 * @authorization  {token}
 * @desc           Test for current route, should return 200 OK and JSON
 * @access         Private
 */
describe("GET /api/v1/users/current", () => {
  it("Should Return 200 OK [User_Id Set]", done => {
    request
      .get("/api/v1/users/current")
      .set("Authorization", token)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        else user_id = res.body.id;
        done();
      });
  });
});

// Profile Testing

/*
 * @route   GET /api/v1/profile/test
 * @desc    Tests Profile Route, Simple Check If Server Is Running
 * @access  Public
 */
describe("GET /api/v1/profile/test", () => {
  it("Should Return 200 OK [Server Is Running]", done => {
    request
      .get("/api/v1/profile/test")
      .set("Accept", "application/json")
      .expect(
        200,
        {
          msg: "Profile Test Route"
        },
        done
      );
  });
});

/*
 * @route   GET /api/v1/profile
 * @desc    Return Current Users Profile
 * @access  Private
 */
describe("GET /api/v1/profile/", () => {
  it("Should Return 404 [There is no profile for this user]", done => {
    request
      .get("/api/v1/profile")
      .set("Authorization", token)
      .set("Accept", "application/json")
      .expect(
        404,
        {
          noProfile: "There is no profile for this user"
        },
        done
      );
  });
});

/*
 * @route   POST /api/v1/profile
 * @params  {handle, bio, skills, youtube, twitter, linkedin, facebook, instagram, github, isStudent, studentId, teacherId}
 * @desc    Create User Profile
 * @access  Private
 */
describe("POST /api/v1/profile", () => {
  const body = {
    handle: "Taylor Swift",
    bio: "I am currently an undergraduate art student in my senior year at NYU",
    skills: "Java,Python,Javascript,Public Speaking,AutoCAD,Accounting",
    youtube: "http://youtube.com/TaylorSwift",
    twitter: "http://twitter.com/TaylorSwift",
    linkedin: "http://linkedin.com/in/TaylorSwift",
    facebook: "http://facebook.com/TaylorSwift",
    instagram: "http://instagram.com/TaylorSwift",
    github: "http://github.com/TaylorSwift",
    isStudent: true,
    studentId: 654321
  };
  it("Should Respond With 201 Created [Profile Created]", done => {
    request
      .post("/api/v1/profile")
      .set("Authorization", token)
      .set("Accept", "application/json")
      .send(body)
      .expect(201)
      .end(err => {
        if (err) return done(err);
        done();
      });
  });
});

/*
 * @route   POST /api/v1/profile
 * @params  {handle, bio, skills, youtube, twitter, linkedin, facebook, instagram, github, isStudent, studentId, teacherId}
 * @desc    Edit User Profile
 * @access  Private
 */
describe("POST /api/v1/profile", () => {
  const body = {
    handle: "Taylor Swift",
    bio:
      "I am currently an undergraduate art student in my senior year at NYU UPDATED",
    skills: "Java,Python,Javascript,Public Speaking,AutoCAD,Accounting",
    youtube: "http://youtube.com/TaylorSwift",
    twitter: "http://twitter.com/TaylorSwift",
    linkedin: "http://linkedin.com/in/TaylorSwift",
    facebook: "http://facebook.com/TaylorSwift",
    instagram: "http://instagram.com/TaylorSwift",
    github: "http://github.com/TaylorSwift",
    isStudent: true,
    studentId: 123456
  };
  it("Should Respond With 200 OK [Profile Updated]", done => {
    request
      .post("/api/v1/profile")
      .set("Authorization", token)
      .set("Accept", "application/json")
      .send(body)
      .expect(200)
      .end(err => {
        if (err) return done(err);
        done();
      });
  });
});

/*
 * @route       GET /api/v1/profile/handle/:handle
 * @params URL  {handle}
 * @desc        Get Profile By Handle
 * @access      Public
 */
describe("GET /api/v1/profile/handle/:handle", () => {
  it("Should Return 200 OK [User Retrieved By Handle]", done => {
    request
      .get("/api/v1/profile/handle/TaylorSwift")
      .set("Accept", "application/json")
      .expect(200, done);
  });
});

/*
 * @route       GET /api/v1/profile/handle/:handle
 * @params URL  {handle}
 * @desc        Get Profile By Handle
 * @access      Public
 */
describe("GET /api/v1/profile/handle/:handle", () => {
  it("Should Return 404 [Could Not Return Profile By Handle]", done => {
    request
      .get("/api/v1/profile/handle/JohnDoe")
      .set("Accept", "application/json")
      .expect(404, done);
  });
});

/*
 * @route       GET /api/v1/profile/user/:user_id
 * @params URL  {user_id}
 * @desc        Get Profile By User ID
 * @access      Public
 */
describe("GET /api/v1/profile/user/:user_id", () => {
  it("Should Return 200 OK [User Retrieved By User Id]", done => {
    request
      .get(`/api/v1/profile/user/${user_id}`)
      .set("Accept", "application/json")
      .expect(200, done);
  });
});

/*
 * @route       GET /api/v1/profile/user/:user_id
 * @params URL  {user_id}
 * @desc        Get Profile By User ID
 * @access      Public
 */
describe("GET /api/v1/profile/user/:user_id", () => {
  it("Should Return 404 [There is no profile for this user]", done => {
    request
      .get(`/api/v1/profile/user/2384298347`)
      .set("Accept", "application/json")
      .expect(404, done);
  });
});

/*
 * @route   POST /api/v1/profile/education
 * @params  {school, location, degree, fieldOfStudy, from, to, isCurrent, description}
 * @desc    Add Education To Profile
 * @access  Private
 */
describe("POST /api/v1/profile/education", () => {
  const body = {
    school: "New York University",
    location: "New York City",
    degree: "B.A Science",
    fieldOfStudy: "Art",
    from: "2015-09-01",
    to: "",
    isCurrent: true,
    description: "Obtaining My Associates Degree Here"
  };
  it("Should Respond With 201 Created [Education Added To Profile]", done => {
    request
      .post("/api/v1/profile/education")
      .set("Authorization", token)
      .set("Accept", "application/json")
      .send(body)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        else edu_id = res.body.id;
        done();
      });
  });
});

/*
 * @route   POST /api/v1/profile/experience
 * @params  {title, company, location, from, to, isCurrent, description}
 * @desc    Add Experience To Profile
 * @access  Private
 */
describe("POST /api/v1/profile/experience", () => {
  const body = {
    title: "Department Manager",
    company: "Museum Of Modern Art",
    location: "321 East Park Ave, New York City",
    from: "2014-09-01",
    to: "2015-08-01",
    isCurrent: false,
    description: "Did <Insert Manager Duties!> Here"
  };
  it("Should Respond With 201 Created [Experience Added To Profile]", done => {
    request
      .post("/api/v1/profile/experience")
      .set("Authorization", token)
      .set("Accept", "application/json")
      .send(body)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        else exp_id = res.body.id;
        done();
      });
  });
});

/*
 * @route   POST /api/v1/profile/courseEnrolledIn
 * @params  {name, type, number, firstName, lastName}
 * @desc    Add courseEnrolledIn [Student] To Profile
 * @access  Private
 */
describe("POST /api/v1/profile/courseEnrolledIn", () => {
  const body = {
    name: "Operating Systems Security",
    type: "CSCI",
    number: 330,
    firstName: "Howard",
    lastName: "CLutz"
  };
  it("Should Respond With 201 Created [courseEnrolledIn Added To Profile]", done => {
    request
      .post("/api/v1/profile/courseEnrolledIn")
      .set("Authorization", token)
      .set("Accept", "application/json")
      .send(body)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        else courseEnrolledIn_id = res.body.id;
        done();
      });
  });
});

/*
 * @route   POST /api/v1/profile/courseTeaching
 * @params  {name, type, number, description, teacherId}
 * @desc    Add courseTeaching [Teacher] To Profile
 * @access  Private
 */
describe("POST /api/v1/profile/courseTeaching", () => {
  const body = {
    name: "Operating Systems Security",
    type: "CSCI",
    number: 330,
    description: "Operating Systems class learn something",
    teacherId: 654321
  };
  it("Should Respond With 201 Created [courseTeaching Added To Profile]", done => {
    request
      .post("/api/v1/profile/courseTeaching")
      .set("Authorization", token)
      .set("Accept", "application/json")
      .send(body)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        else courseTeaching_id = res.body.id;
        done();
      });
  });
});

/*
 * @route       DELETE /api/v1/profile/education/:edu_id
 * @params URL  {edu_id}
 * @desc        Delete Education From Profile
 * @access      Private
 */
describe("DELETE /api/v1/profile/education/:edu_id", () => {
  it("Should Return 200 OK [Education Deleted From Profile]", done => {
    request
      .delete(`/api/v1/profile/education/${edu_id}`)
      .set("Authorization", token)
      .set("Accept", "application/json")
      .expect(200, done);
  });
});

/*
 * @route       DELETE /api/v1/profile/education/:edu_id
 * @params URL  {edu_id}
 * @desc        Delete Education From Profile
 * @access      Private
 */
describe("DELETE /api/v1/profile/education/:edu_id", () => {
  it("Should Return 401 Unauthorized [Not Authenticated]", done => {
    request
      .delete(`/api/v1/profile/education/${edu_id}`)
      .set("Accept", "application/json")
      .expect(401, done);
  });
});

/*
 * @route       DELETE /api/v1/profile/experience/:exp_id
 * @params URL  {exp_id}
 * @desc        Delete Experience From Profile
 * @access      Private
 */
describe("DELETE /api/v1/profile/experience/:exp_id", () => {
  it("Should Return 200 OK [Experience Deleted From Profile]", done => {
    request
      .delete(`/api/v1/profile/experience/${exp_id}`)
      .set("Authorization", token)
      .set("Accept", "application/json")
      .expect(200, done);
  });
});

/*
 * @route       DELETE /api/v1/profile/experience/:exp_id
 * @params URL  {exp_id}
 * @desc        Delete Experience From Profile
 * @access      Private
 */
describe("DELETE /api/v1/profile/experience/:exp_id", () => {
  it("Should Return 401 Unauthorized [Not Authenticated]", done => {
    request
      .delete(`/api/v1/profile/experience/${exp_id}`)
      .set("Accept", "application/json")
      .expect(401, done);
  });
});

/*
 * @route       DELETE /api/v1/profile/courseEnrolledIn/:courseEnrolledIn_id
 * @params URL  {courseEnrolledIn_id}
 * @desc        Delete courseEnrolledIn Field From Profile
 * @access      Private
 */
describe("DELETE /api/v1/profile/courseEnrolledIn/:courseEnrolledIn_id", () => {
  it("Should Return 200 OK [CourseEnrolledIn Field Deleted From Profile]", done => {
    request
      .delete(`/api/v1/profile/courseEnrolledIn/${courseEnrolledIn_id}`)
      .set("Authorization", token)
      .set("Accept", "application/json")
      .expect(200, done);
  });
});

/*
 * @route       DELETE /api/v1/profile/teacherField/:courseTeaching_id
 * @params URL  {courseTeaching_id}
 * @desc        Delete courseTeaching Field From Profile
 * @access      Private
 */
describe("DELETE /api/v1/profile/courseTeaching/:courseTeaching_id", () => {
  it("Should Return 200 OK [courseTeaching Field Deleted From Profile]", done => {
    request
      .delete(`/api/v1/profile/courseTeaching/${courseTeaching_id}`)
      .set("Authorization", token)
      .set("Accept", "application/json")
      .expect(200, done);
  });
});

/*
 * @route   DELETE /api/v1/profile
 * @desc    Delete User And Profile
 * @access  Private
 */
describe("DELETE /api/v1/profile", () => {
  it("Should Return 401 Unauthorized [No JWT Token]", done => {
    request
      .delete("/api/v1/profile")
      .set("Accept", "application/json")
      .expect(401, done);
  });
});

/*
 * @route   DELETE /api/v1/profile
 * @desc    Delete User And Profile
 * @access  Private
 */
describe("DELETE /api/v1/profile", () => {
  it("Should Return 200 OK [Authenticated User Deletes Own Profile/User]", done => {
    request
      .delete("/api/v1/profile")
      .set("Authorization", token)
      .set("Accept", "application/json")
      .expect(200, done);
  });
});
