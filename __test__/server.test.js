'use strict';
require("dotenv").config
process.env.SECRET = "TEST_SECRET";

const { db } = require('../src/models/index-model');
const supertest = require('supertest');
const server = require('../src/server').server;

const mockRequest = supertest(server);
// const { app } = require('../src/server'); // destructing assignment 
// const supertest = require('supertest');
// const mockRequest = supertest(app);
// // console.log('************************************');
// // console.log(mockRequest);
// // console.log('************************************');

// // const { db } = require('../src/models/index');

// before any of the test create a connection
// beforeAll(async () => {
//     await db.sync();
// });

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
  // it('We can get to the main route ', async () => {

  //   const response = await mockRequest.post('/users/signup').send(userData.testUser);
  //   const userObject = response.body;
  //   console.log(userObject)
  //   expect(response.status).toBe(201);
  //   expect(userObject.username).toEqual(userData.testUser.username);
   
  // });
  
  // it('Can signin with basic auth string', async () => {
  //   let { username, password } = userData.testUser;

  //   const response = await mockRequest.post('/users/login')
  //     .auth(username, password);

  //   const userObject = response.body;
  //   expect(response.status).toBe(200);
  //   expect(userObject.token).toBeDefined();
  //   expect(userObject.user.id).toBeDefined();
  //   expect(userObject.user.username).toEqual(username);
  // });
})
// afterAll(async () => {
//   await db.drop();
// });