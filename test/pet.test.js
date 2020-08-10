const request = require('supertest');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const mongoose = require('mongoose');

const app = require('../app');
const expect = chai.expect;

chai.use(chaiAsPromised);

const Pet = require('../models/pets');

describe('functional - pet', () => {
	before((done) => {
        Pet.remove({}, (err) => { 
           done();           
        });        
    });
	
  it('should fail to create a pet without a name', async () => {
    const res = await request(app).post('/pets').send({
      age: 10,
      colour: 'brown',
    });
    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal('"name" is required');
  });
  
  it('should fail to create a pet without an age', async () => {
    const res = await request(app).post('/pets').send({
      name: 'Sultan',
      colour: 'black',
    });
    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal('"age" is required');
  });
  
  it('should fail to create a pet without a colour', async () => {
    const res = await request(app).post('/pets').send({
      name: 'Oscar',
      age: 10,
    });
    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal('"colour" is required');
  });
  
  it('should create a pet', async () => {
    const pet = {
      name: 'Simba',
      age: 8,
      colour: 'brown',
    };
    const res = await request(app).post('/pets').send(pet);
    expect(res.status).to.equal(201);
    expect(res.body.name).to.equal(pet.name);
    expect(res.body.age).to.equal(pet.age);
    expect(res.body.colour).to.equal(pet.colour);
	app.locals.demoId = mongoose.Types.ObjectId(res.body._id);	//to be used later for delete.
  });
  
  it('should display all the pets(1)', async () => {
    const res = await request(app).get('/pets');
    expect(res.body).to.be.a('array');
    expect(res.body).to.have.lengthOf(1);
  });
  
  it('should display pet for the given id.', async () => {
	  const pet = {
		  name: 'Sultan',
		  age: 11,
		  colour: 'black',
    };
	const res1 = await request(app).post('/pets').send(pet);
    const res = await request(app).get('/pets/'+res1.body._id );
    expect(res.body.name).to.equal(pet.name);
    expect(res.body.age).to.equal(pet.age);
    expect(res.body.colour).to.equal(pet.colour);	
  });
  
  it('should not be able to display pet for the given invalid id.', async () => {
	const res = await request(app).get('/pets/'+new mongoose.Types.ObjectId() );
	expect(res.status).to.equal(404);
  });

  it('should display all the pets(2)', async () => {
    const res = await request(app).get('/pets');
    expect(res.body).to.be.a('array');
    expect(res.body).to.have.lengthOf(2);
  }); 
  
  it('should delete one pet data by id', async () => {
    await request(app).delete('/pets/'+app.locals.demoId);
	const res = await request(app).get('/pets/'+app.locals.demoId);
	expect(res.status).to.equal(404);
  }); 
  
  it('should not be able to delete a non-existing pet data(by id)', async () => {
    const res = await request(app).delete('/pets/'+app.locals.demoId);
    expect(res.status).to.equal(404);
  });   

  it('should display all the pets(1)', async () => {
    const res = await request(app).get('/pets');
    expect(res.body).to.be.a('array');
    expect(res.body).to.have.lengthOf(1);
  });   
  
});