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


describe('project jest test ', () => {

  it('We can get to the main route ', async () => {

    const response = await mockRequest.get('/')
    
    expect(response.status).toBe(200);
   
  });
  it('We can get to the main route ', async () => {

    const response = await mockRequest.get('/login')
    
    expect(response.status).toBe(200);
   
  });
 
  
})
