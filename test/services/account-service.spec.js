/* global afterEach beforeEach describe it */
const chai = require('chai');
const sinon = require('sinon');
require('chai');

const { expect } = chai;
const createError = require('http-errors');

const Account = require('../../models/Account');

const target = require('../../services/account-service');

describe('Account service tests', () => {

    let accountMock;
    const accountId = '60291a9703af3e305a05213f';
    const userId = '70881a9703af3e305a05213f';
    const name = 'test';
    const email = 'test@test.com';

    beforeEach(() => {
        accountMock = sinon.mock(Account);
    });

    afterEach(() => {
        accountMock.verify();
        sinon.restore();
    });

    describe('createAccount tests', () => {

        const account = { name, email };

        it('should successfully create a new account', () => {

            accountMock.expects('findOne').withArgs({ email }).resolves(false);

            sinon.stub(Account.prototype, 'save').callsFake(() => Promise.resolve());

            return target.createAccount(account)
                .then((result) => {
                    expect(result.name).to.equal(name);
                    expect(result.email).to.equal(email);
                });
        });

        it('should throw 409 error if email already exists', () => {

            accountMock.expects('findOne').withArgs({ email }).resolves(true);

            return target.createAccount(account)
                .then(() => Promise.reject(createError('Failed test')))
                .catch((err) => {
                    expect(err.statusCode).to.equal(409);
                });
        });
    });

    describe('getAccount tests', () => {

        it('should successfully retrieve the account by account ID', () => {

            accountMock.expects('findById').withArgs(accountId).resolves({ email, name });

            return target.getAccount(accountId)
                .then((result) => {
                    expect(result.email).to.equal(email);
                    expect(result.name).to.equal(name);
                });
        });

        it('should throw 404 error if account does not exist', () => {

            accountMock.expects('findById').withArgs(accountId).resolves(undefined);

            return target.getAccount(accountId)
                .then(() => Promise.reject(createError('Failed test')))
                .catch((err) => {
                    expect(err.statusCode).to.equal(404);
                });
        });
    });

    describe('getAccounts tests', () => {

        it('should successfully return all accounts', () => {

            accountMock.expects('find').resolves([{ email, name }]);

            return target.getAccounts()
                .then((result) => {
                    expect(result).to.have.length(1);
                });
        });
    });

    describe('addUserToAccount tests', () => {

        it('should successfully add user to account', () => {

            accountMock.expects('updateOne').withArgs({ _id: accountId }, { $push: { users: userId } }).resolves();

            return target.addUserToAccount(accountId, userId);
        });
    });
});
