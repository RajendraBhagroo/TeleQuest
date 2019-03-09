const host = process.env.HOST || `127.0.0.1`;
const port = process.env.PORT || 3001;
const request = require("supertest").agent(`${host}:${port}`);

/*
 * Token is a bearer token
 * user_id is the _id from db, supplied from URL
 */
let token = null;
let user_id = "";

/*
 * @route   GET /api/v1/users/test
 * @desc    Tests users route, should respond with JSON message and 200 OK
 * @access  Public
 */
describe("GET /api/v1/users/", () => {
  it("Should Return JSON Message and 200 OK", done => {
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
 * @route   POST /api/v1/users/register
 * @params  {firstName, lastName, email, password, password2}
 * @desc    Register user, should respond with 201 Created
 * @access  Public
 */
describe("POST /api/v1/users/register", () => {
  const body = {
    firstName: "John",
    lastName: "Doe",
    email: "JohnDoe@Nyit.edu",
    password: "123456",
    password2: "123456"
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
 * @route          POST /api/v1/users/register
 * @params         {firstName, lastName, password, password2}
 * @params missing {email}
 * @desc           Register user missing 1 Param should send 400 Bad Request
 * @access         Public
 */
describe("POST /api/v1/users/register", () => {
  const body = {
    firstName: "John",
    lastName: "Doe",
    password: "123456",
    password2: "123456"
  };
  it("Should Respond With 400 Bad Request", done => {
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
 * @route   POST /api/v1/users/register
 * @params  {firstName, lastName, email, password, password2}
 * @desc    Register user using existing email should send 400 Bad Request
 * @access  Public
 */
describe("POST /api/v1/users/register", () => {
  const body = {
    firstName: "John",
    lastName: "Doe",
    email: "JohnDoe@Nyit.edu",
    password: "123456",
    password2: "123456"
  };
  it("Should Respond With 400 Bad Request", done => {
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
 * @route   POST /api/v1/users/login
 * @params  {email, password}
 * @desc    Tests successful login, should send 200 OK
 * @access  Public
 */
describe("POST /api/v1/users/login", () => {
  const body = {
    email: "JohnDoe@Nyit.edu",
    password: "123456"
  };
  it("Should Respond With 200 OK", done => {
    request
      .post("/api/v1/users/login")
      .send(body)
      .set("Accept", "application/json")
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
 * @route   POST /api/v1/users/login
 * @params  {email, password}
 * @desc    Test failed login, wrong password should send 400 Bad Request
 * @access  Public
 */
describe("POST /api/v1/users/login", () => {
  const body = {
    email: "JohnDoe@Nyit.edu",
    password: "123454"
  };
  it("Should Respond With 400 Bad Request", done => {
    request
      .post("/api/v1/users/login")
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
 * @route          GET /api/v1/users/current
 * @authorization  {token}
 * @desc           Test for current route, should return 200 OK and JSON
 * @access         Private
 */
describe("GET /api/v1/users/current", () => {
  it("Should Return JSON Message, and 200 OK", done => {
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

/*
 * @route         DELETE /api/v1/users/:user_id
 * @params URL    {:user_id}
 * @authorization {token}
 * @desc          Test delete route, should return 200 OK
 * @access        Private
 */
describe("DELETE /api/v1/users/:user_id", () => {
  it("Should Respond With Success and 200 OK", done => {
    request
      .delete(`/api/v1/users/${user_id}`)
      .set("Authorization", token)
      .expect(200)
      .end(err => {
        if (err) return done(err);
        done();
      });
  });
});

/*
 * @route         DELETE /api/v1/users/:user_id
 * @params URL    {:user_id}
 * @authorization {token}
 * @desc          Deletes user with given authorization, and user_id, should return 401 Unauthorized (user is not in database)
 * @access        Private
 */
describe("DELETE /api/v1/users/:user_id", () => {
  it("Should Respond With 401 Unauthorized", done => {
    request
      .delete(`/api/v1/users/${user_id}`)
      .set("Authorization", token)
      .expect(401)
      .end(err => {
        if (err) return done(err);
        done();
      });
  });
});
