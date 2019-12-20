const request = require('supertest');
const dotenv = require('dotenv').config();
const app = require('../app')
const db = require('../database/db')

let server, agent;

describe('Test login feature', () => {
    
    beforeAll((done) => {

        server = app.listen(5000, (err) => {
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

    test('User should be able to login with valid login credential', async () => {

        const response = await agent
            .post('/login')
            .field('email', 'benarayanz@gmail.com')
            .field('password', 'Qwerty1234')
        
        response_json = JSON.parse(response.text);

        expect(response_json['message']).toBe('Success');
        expect(response.statusCode).toBe(200);
    });
})