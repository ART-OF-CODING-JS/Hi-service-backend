'use strict';
require("dotenv").config
process.env.SECRET = "TEST_SECRET";
require("../src/routers/login")
const { db,users } = require('../src/models/index-model');
const supertest = require('supertest');
const server = require('../src/server').server;

const mockRequest = supertest(server);



let userData = {
  testUser: { username: 'user', password: 'password' },
};
let accessToken = null;

beforeAll(async (done) => {
  await db.sync();
  await users.create(userData.testUser);
  done();
});

afterAll(async (done) => {
  await db.drop();
  done();
});


describe('project jest test ', () => {

  it('We can get to the main route ', async () => {

    const response = await mockRequest.get('/')
    
    expect(response.status).toBe(200);
   
  });
  it('We can get to the main route ', async () => {

    const response = await mockRequest.get('/login')
    
    expect(response.status).toBe(200);
   
  });
  it("test v2 getAll ", async () => {
    const resToken = await mockRequest.post("/users/login").auth("user", "password");
    const token = resToken.body.token;

    const res = await mockRequest
      .get("/api/v2/interactions")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
  });
})
