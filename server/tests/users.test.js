const host = process.env.HOST || `127.0.0.1`;
const port = process.env.PORT || 3001;
const request = require("supertest").agent(`http://${host}:${port}`);

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

// Test -> Register Missing 1 Param SHOULD SEND 400
// Test -> Register with existing email SHOULD SEND 400
// Test -> User Login: Success
// Test -> User Login: Fail Incorrect Password SEND 400
// Test -> User Delete: Success
// Test -> User Delete: ID Not Found SEND 400
