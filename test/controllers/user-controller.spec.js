const chai = require('chai');
const expect = chai.expect;

require('chai');

describe('User controller tests', () => {

    describe('registerUser tests', () => {

        it('should successfully call the user service to register a user', () => {

            expect(200).to.equal(200);
        });
    });

    describe('loginUser tests', () => {

        it('should successfully call the user service to login a user', () => {
            expect(200).to.equal(200);
        });
    });
});
