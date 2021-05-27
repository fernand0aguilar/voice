const request = require("supertest");
const app = require("../api/server");

describe('Litmus Test', () => {
    it('should test that true === true', () => {
      expect(true).toBe(true)
    })
  })
  

describe('Test Base API endpoint', () => {
  it('should test that endpoint is reached', async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("msg");
    expect(res.body.msg).toEqual("Welcome to application.");  
  })
})