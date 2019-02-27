const host = process.env.HOST || `http://127.0.0.1`;
const port = process.env.PORT || 3001;
const request = require("supertest").agent(`${host}:${port}`);
var token = null;
var userid="";
/*
 * @route   GET api/v1/users/test
 * @desc    Tests users route
 * @access  Public
 */
describe("GET /api/v1/users/", () => {
  it("Should Return JSON Message", done => {
    request
      .get("/api/v1/users/")
      .set("Accept", "application/json")
      .expect(
        200,
        {
          msg: "User Test Route"
        },
        done
      );
  });
});

/*
 * @route   POST api/v1/users/register
 * @params  {name, email, password}
 * @desc    Register user
 * @access  Public
 */
describe("POST /api/v1/users/register", () => {
  const body = {
    name: "John Doe",
    email: "JohnDoe@Gmail.com",
    password: "123456"
  };
  it("Should Respond With 201 Created", done => {
    request
      .post("/api/v1/users/register")
      .send(body)
      .set("Accept", "application/json")
      .expect(201)
      .end(err => {
        if (err) return done(err);
        done();
      });
  });
}); 
/*
 * @route   POST api/v1/users/register
 * @params  {name, email}
 * @desc    Register user Missing 1 Param should send 400
 * @access  Public
 */
describe("POST /api/v1/users/register", () => {
  const body = {
    name: "Johnny Doe",
    email: "JohnDoeMissingParm@Gmail.com"

  };
  it("Should Respond With 400 Created", done => {
    request
      .post("/api/v1/users/register")
      .send(body)
      .set("Accept", "application/json")
      .expect(400)
      .end(err => {
        if (err) return done(err);
        done();
      });
  });
});
/*
 * @route   POST api/v1/users/register
 * @params  {name, email, password}
 * @desc    Register user using same email should send 400
 * @access  Public
 */
describe("POST /api/v1/users/register", () => {
  const body = {
    name: "Johnny Doe",
    email: "JohnDoe@Gmail.com",
    password: "123456"

  };
  it("Should Respond With 400 Created", done => {
    request
      .post("/api/v1/users/register")
      .send(body)
      .set("Accept", "application/json")
      .expect(400)
      .end(err => {
        if (err) return done(err);
        done();
      });
  });
});
/*
 * @route   POST api/v1/users/login
 * @params  {email, password}
 * @desc    Tests successful login, should send 200
 * @access  Public
 */
describe("POST /api/v1/users/login", () => {
  const body = {
    email: "JohnDoe@Gmail.com",
    password: "123456"
  };
  it("Should Respond With Success", done => {
    request
      .post("/api/v1/users/login")
      .send(body)
      .set("Accept", "application/json")
      .expect(200)
      .end((err,res) => {
        if (err) return done(err);
        else
        {
          token =res.body.token;
        }
        done();
      });
  });
});
/*
 * @route   POST api/v1/users/login
 * @params  {email, password}
 * @desc    Test failed login should send 400
 * @access  Public
 */
describe("POST /api/v1/users/login", () => {
  const body = {
    email: "JohnDoe@Gmail.com",
    password: "123454"
  };
  it("Should Respond With Failure", done => {
    request
      .post("/api/v1/users/login")
      .send(body)
      .set("Accept", "application/json")
      .expect(400)
      .end(err=> {if (err)
        return done(err);
        done();
      });
  });
});
/*
 * @route   GET api/v1/users/current
 * @params  {token}
 * @desc    Test for current route, should return 200 and JSON
 * @access  Private
 */
describe("GET /api/v1/users/current", () => {
  it("Should Return JSON Message", done => {
    request
      .get("/api/v1/users/current")
      .set("Authorization",token)
      .expect(200)
      .end((err,res) => {
        if (err) return done(err);
        else
        userid=res.body.id;
        done();
      });
  });
});
// Test -> User Delete: Success
/*
 * @route   DELETE api/v1/users/:userid
 * @params  {userid, token}
 * @desc    Test delete route, should return 200
 * @access  Private
 */
describe("DELETE /api/v1/users/:user_id", () => {
  const body={
    user_id:userid
  }
  it("Should Respond With Success", done => {      
    request
      .delete('/api/v1/users/'+userid)
      .set("Authorization",token)
      .expect(200)
      .end(err => {
        if (err) return done(err);
        done();
      });
  });
});
/*
 * @route   DELETE api/v1/users/:userid
 * @params  {user_id, token}
 * @desc    Deletes user with given authorization, and user_id, should return 401
 * @access  Private
 */
describe("DELETE /api/v1/users/:user_id", () => {
  const body={
    user_id:userid
  }
  it("Should Respond With Failure", done => {      
    request
      .delete('/api/v1/users/'+userid)
      .set("Authorization",token)
      .expect(401)
      .end(err => {
        if (err) return done(err);
        done();
      });
  });
});
