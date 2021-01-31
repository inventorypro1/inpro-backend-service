const chai = require('chai');
const expect = chai.expect;
require('chai');

// TODO: uncomment these when you make these tests proper
// const bcrypt = require('bcryptjs');
// const target = require('./../../services/user-service');

describe('User service tests', () => {

    describe('registerUser tests', () => {

        it('should successfully register a new user', () => {

            expect(200).to.equal(200);
        });
    });

    describe('loginUser tests', () => {

        it('should successfully login an existing user', () => {
            expect(200).to.equal(200);
        });
    });
});
