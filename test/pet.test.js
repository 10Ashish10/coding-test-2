const request = require('supertest');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const app = require('../app');
const expect = chai.expect;

chai.use(chaiAsPromised);

describe('functional - user', () => 
{
  it('fail to create without age', async () => {
    const res = await request(app).post('/users').send({
      name: 'goofy',
      color: 'gamer'
    });
    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal('"name" is required');
  });




  it('fail to create without a name', async () => {
    const res = await request(app).post('/users').send({
      age: 16,
      color: 'gamer',
    });
    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal('"name" is required');
  });

  

  it('should fail to create without color', async () => {
    const res = await request(app).post('/users').send({
      name: 'goofy',
      age: 4,
    });
    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal('"name" is required');
  });



  it('should create a user', async () => {
    const pet = {
      name: 'google',
      age: 16,
      color: 'gamer',
    };
    const res = await request(app).post('/users').send(pet);
    expect(res.status).to.equal(201);
    expect(res.body.name).to.equal(pet.name);
    expect(res.body.age).to.equal(pet.age);
    expect(res.body.color).to.equal(pet.color);
  });
});
