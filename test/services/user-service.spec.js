/* global afterEach beforeEach describe it */
const chai = require('chai');
const sinon = require('sinon');
require('chai');

const { expect } = chai;
const createError = require('http-errors');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const accountService = require('../../services/account-service');

const User = require('../../models/User');

const target = require('../../services/user-service');

describe('User service tests', () => {

    let userMock;
    let bcryptMock;
    let accountServiceMock;

    beforeEach(() => {
        bcryptMock = sinon.mock(bcrypt);
        userMock = sinon.mock(User);
        accountServiceMock = sinon.mock(accountService);
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('registerUser tests', () => {

        const user = {
            name: 'testName',
            email: 'test@test.com',
            password: 'test',
            password2: 'test'
        };

        const accountId = '123';

        beforeEach(() => {
            bcryptMock = sinon.mock(bcrypt);
            userMock = sinon.mock(User);
        });

        it('should successfully register a new user', () => {

            userMock.expects('findOne').withArgs({ email: user.email }).resolves(false);
            bcryptMock.expects('genSalt').withArgs(10).resolves('salt');
            bcryptMock.expects('hash').withArgs('test', 'salt').resolves('hashedPassword');
            accountServiceMock.expects('getAccount').withArgs(accountId).resolves();
            accountServiceMock.expects('addUserToAccount').withArgs(accountId, sinon.match.any).resolves();

            sinon.stub(User.prototype, 'save').callsFake(() => Promise.resolve());

            return target.registerUser(user, accountId)
                .then((result) => {
                    expect(result.password).to.equal('hashedPassword');
                });
        });

        it('should throw 404 if the accountId does not exist', () => {

            accountServiceMock.expects('getAccount').withArgs(accountId).throws(createError(404));

            return target.registerUser(user, accountId)
                .then(() => Promise.reject(createError('Failed test')))
                .catch((err) => {
                    expect(err.statusCode).to.equal(404);
                });
        });

        it('should throw 409 error if user already exists with email', () => {

            accountServiceMock.expects('getAccount').withArgs(accountId).resolves();
            userMock.expects('findOne').withArgs({ email: user.email }).resolves(true);

            return target.registerUser(user, accountId)
                .then(() => Promise.reject(createError('Failed test')))
                .catch((err) => {
                    expect(err.statusCode).to.equal(409);
                });
        });

    });

    describe('loginUser tests', () => {

        let jwtMock;

        const email = 'test@test.com';
        const password = 'testtest';
        const existingUser = {
             id: 1, name: 'test', email: 'test@test.com', password: 'testtest'
        };
        const resolvedToken = 'HiGhLySeCuRe';

        beforeEach(() => {
            jwtMock = sinon.mock(jwt);
        });

        it('should successfully login an existing user', () => {

            userMock.expects('findOne').withArgs({ email }).resolves(existingUser);
            bcryptMock.expects('compare').withArgs(password, existingUser.password).resolves(true);
            jwtMock.expects('sign').withArgs({ id: existingUser.id, name: existingUser.name }, 'secret', { expiresIn: 31556926 })
                .resolves(resolvedToken);

            return target.loginUser(email, password)
                .then((result) => {
                    expect(result.success).to.equal(true);
                    expect(result.token).to.equal(`Bearer ${resolvedToken}`);
                });
        });

        it('should throw 404 error is user does not exist', () => {

            userMock.expects('findOne').withArgs({ email }).resolves(undefined);

            return target.loginUser(email, password)
                .then(() => Promise.reject(createError('Failed test')))
                .catch((err) => {
                    expect(err.statusCode).to.equal(404);
                });
        });

        it('should throw 401 error if password entered is incorrect', () => {

            const incorrectPassword = 'incorrect';

            userMock.expects('findOne').withArgs({ email }).resolves(existingUser);
            bcryptMock.expects('compare').withArgs(incorrectPassword, existingUser.password).resolves(false);

            return target.loginUser(email, incorrectPassword)
                .then(() => Promise.reject(createError('Failed test')))
                .catch((err) => {
                    expect(err.statusCode).to.equal(401);
                });
        });
    });
});
