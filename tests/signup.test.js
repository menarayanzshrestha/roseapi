const request = require('supertest');
const dotenv = require('dotenv').config();
const app = require('../app')
const db = require('../database/db')

let server, agent;

describe('Test signup feature', () => {

    beforeAll((done) => {
        server = app.listen(4000, (err) => {
            if (err) return done(err);

            agent = request.agent(server); // since the application is already listening, it should use the allocated port
            done();
        });
    });

    afterAll((done) => {
        server.close();
        // Delete test database after the test is complete.
        db.mongoose.connection.db.dropDatabase(
            console.log(`${db.mongoose.connection.db.databaseName} database dropped.`)
            )
        db.disconnect(done);
    });

    test('User should be able to signup with a valid email, password, confirmPassword and fullName', async () => {
        const response = await agent
            .post('/signup')
            .field('email', 'benarayanz@gmail.com')
            .field('password', 'Qwerty1234')
            .field('confirmPassword', 'Qwerty1234')
            .field('fullName', 'Narayan Shrestha')
        
        response_json = JSON.parse(response.text);


        expect(response_json['message']).toBe('New User created successfully')
        expect(response.statusCode).toBe(200);
    });
})
