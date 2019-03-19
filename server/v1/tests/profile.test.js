const host = process.env.HOST || `127.0.0.1`;
const port = process.env.PORT || 3001;
const request = require("supertest").agent(`${host}:${port}`);

/*
 * @route   GET /api/v1/profile/test
 * @desc    Tests profile route, should respond with JSON message and 200 OK
 * @access  Public
 */
describe("GET /api/v1/profile/test", () => {
  it("Should Return JSON Message and 200 OK", done => {
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
