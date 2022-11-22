'use strict';

const supertest = require('supertest');
const { app } = require('../src/server');
const request = supertest(app);


describe('REST API Tests', () => {
  
  test('Server starts', async () => {

  });

  test('Reads a list of All Job listings', async () => {

  });

  test('Reads a list of updated Job listings', async () => {

  });
});
