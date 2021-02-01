/* global describe afterEach beforeEach it */
const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
require('chai');

const httpMocks = require('node-mocks-http');

const userService = require('../../services/user-service');
const target = require('../../controllers/user-controller');

describe('User controller tests', () => {

    let response;
    let userServiceMock;
    const success = { ok: true };

    beforeEach(() => {
        userServiceMock = sinon.mock(userService);
        response = httpMocks.createResponse();
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('registerUser tests', () => {

        it('should successfully call the user service to register a user', () => {

            const req = { body: { name: 'test', email: 'test@test.com' } };

            userServiceMock.expects('registerUser').withArgs(req.body).resolves(success);

            return target.registerUser(req, response)
                .then((res) => {
                    expect(res.statusCode).to.equal(201);
                    expect(JSON.parse(res._getData())).to.deep.equal(success);
                });
        });
    });

    describe('loginUser tests', () => {

        it('should successfully call the user service to login a user', () => {

            const email = 'test@test.com';
            const password = 'testtest';

            const req = { body: { email, password } };

            userServiceMock.expects('loginUser').withArgs(email, password).resolves(success);

            return target.loginUser(req, response)
                .then((res) => {
                    expect(res.statusCode).to.equal(200);
                    expect(JSON.parse(res._getData())).to.deep.equal(success);
                });
        });
    });
});
