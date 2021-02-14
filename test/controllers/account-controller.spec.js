/* global describe afterEach beforeEach it */
const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
require('chai');

const httpMocks = require('node-mocks-http');

const accountService = require('../../services/account-service');
const target = require('../../controllers/account-controller');

describe('Account controller tests', () => {

    let response;
    let accountServiceMock;
    const success = { ok: true };

    const accountId = '123';
    const name = 'test';
    const email = 'test@test.com';
    const password = 'testtest';

    beforeEach(() => {
        accountServiceMock = sinon.mock(accountService);
        response = httpMocks.createResponse();
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('createAccount tests', () => {

        it('should successfully create an account', () => {

            const req = { body: { name, email, password } };

            accountServiceMock.expects('createAccount').withArgs(req.body).resolves(success);

            return target.createAccount(req, response)
                .then((res) => {
                    expect(res.statusCode).to.equal(201);
                    expect(JSON.parse(res._getData())).to.deep.equal(success);
                });
        });
    });

    describe('getAccount tests', () => {

        it('should successfully retrieve an account by ID', () => {

            const req = { params: { accountId } };

            accountServiceMock.expects('getAccount').withArgs(accountId).resolves(success);

            return target.getAccount(req, response)
                .then((res) => {
                    expect(res.statusCode).to.equal(200);
                    expect(JSON.parse(res._getData())).to.deep.equal(success);
                });
        });
    });

    describe('getAccounts tests', () => {

        it('should successfully retrieve an account by ID', () => {

            const req = {};

            accountServiceMock.expects('getAccounts').withArgs().resolves(success);

            return target.getAccounts(req, response)
                .then((res) => {
                    expect(res.statusCode).to.equal(200);
                    expect(JSON.parse(res._getData())).to.deep.equal(success);
                });
        });
    });
});
