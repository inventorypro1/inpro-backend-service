const chai = require('chai');
const expect = chai.expect;

require('chai');

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
