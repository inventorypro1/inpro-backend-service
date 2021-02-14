/* global beforeEach describe it */
const { expect } = require('chai');

const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');

const userRoutes = require('../../routes/users');

describe('User tests', () => {

    let app;
    const accountId = '60291a9703af3e305a05213f';
    const validQueryParamsString = `accountId=${accountId}`;

    function validationError(err, req, res, next) {
        next(err);
    }

    beforeEach(() => {
        app = express();
        app.use(bodyParser.json());
        app.use('/', userRoutes);
        app.use(validationError);
    });

    describe('Tests for POST /api/users/register endpoint validation', () => {

        function registerUser(queryParamsString, body, expectedErrorMessage, done) {

            let queryString = '/register';
            if (queryParamsString) {
                queryString += `?${queryParamsString}`;
            }
            request(app)
                .post(queryString)
                .send(body)
                .end((err, res) => {
                    expect(res.statusCode).to.equal(422);

                    const errors = JSON.parse(res.text).errors;

                    const errorMessage = errors[0].msg;
                    expect(errorMessage).to.equal(expectedErrorMessage);
                    done();
                });
        }

        it('should fail if name field is not provided', (done) => {

            const body = { email: 'test@test.com', password: 'testtest', password2: 'testtest' };

            const expectedErrorMessage = '\'name\' field is required';
            registerUser(validQueryParamsString, body, expectedErrorMessage, done);
        });

        it('should fail if email field is not provided', (done) => {

            const body = { name: 'test', password: 'testtest', password2: 'testtest' };

            const expectedErrorMessage = '\'email\' field is required';
            registerUser(validQueryParamsString, body, expectedErrorMessage, done);
        });

        it('should fail if password field is not provided', (done) => {

            const body = { name: 'test', email: 'test@test.com', password2: 'testtest' };

            const expectedErrorMessage = '\'password\' field is required';
            registerUser(validQueryParamsString, body, expectedErrorMessage, done);
        });

        it('should fail if password2 field is not provided', (done) => {

            const body = { name: 'test', email: 'test@test.com', password: 'testtest' };

            const expectedErrorMessage = '\'password2\' field is required';
            registerUser(validQueryParamsString, body, expectedErrorMessage, done);
        });

        it('should fail if name field has length less than 3', (done) => {

            const body = {
                name: 'tt', email: 'test@test.com', password: 'testtest', password2: 'testtest'
            };

            const expectedErrorMessage = 'Name must be between 3 and 20 characters long';
            registerUser(validQueryParamsString, body, expectedErrorMessage, done);
        });

        it('should fail if email is invalid', (done) => {

            const body = {
                name: 'test', email: 'test', password: 'testtest', password2: 'testtest'
            };

            const expectedErrorMessage = 'Email provided is not valid';
            registerUser(validQueryParamsString, body, expectedErrorMessage, done);
        });

        it('should fail if password length is less than 4', (done) => {

            const body = {
                name: 'test', email: 'test@test.com', password: 'tt', password2: 'testtest', accountId
            };

            const expectedErrorMessage = 'Password must be between 4 to 16 characters';
            registerUser(validQueryParamsString, body, expectedErrorMessage, done);
        });

        it('should fail if passwords do not match', (done) => {

            const body = {
                name: 'test', email: 'test@test.com', password: 'test', password2: 'testtest'
            };

            const expectedErrorMessage = 'Passwords must be the same';
            registerUser(validQueryParamsString, body, expectedErrorMessage, done);
        });

        it('should fail if accountId is not provided', (done) => {

            const body = {
                name: 'test', email: 'test@test.com', password: 'test', password2: 'test'
            };

            const expectedErrorMessage = '\'accountId\' field is required';
            registerUser('', body, expectedErrorMessage, done);
        });

        it('should fail if accountId is not valid', (done) => {

            const body = {
                name: 'test', email: 'test@test.com', password: 'test', password2: 'test'
            };

            const expectedErrorMessage = '\'accountId\' field is required';
            registerUser('', body, expectedErrorMessage, done);
        });

        it('should fail if accountId is not valid', (done) => {

            const body = {
                name: 'test', email: 'test@test.com', password: 'test', password2: 'test'
            };

            const expectedErrorMessage = 'Account ID is not a valid object ID';
            registerUser('accountId=234', body, expectedErrorMessage, done);
        });
    });

    describe('Tests for POST /api/users/login endpoint validation', () => {

        function loginUser(body, expectedErrorMessage, done) {
            request(app)
                .post('/login')
                .send(body)
                .end((err, res) => {
                    expect(res.statusCode).to.equal(422);

                    const errors = JSON.parse(res.text).errors;

                    const errorMessage = errors[0].msg;
                    expect(errorMessage).to.equal(expectedErrorMessage);
                    done();
                });
        }

        it('should fail if email field is not provided', (done) => {

            const body = { password: 'testtest' };

            const expectedErrorMessage = '\'email\' field is required';
            loginUser(body, expectedErrorMessage, done);
        });

        it('should fail if email is not valid', (done) => {

            const body = { email: 'test', password: 'testtest' };

            const expectedErrorMessage = 'Email provided is not valid';
            loginUser(body, expectedErrorMessage, done);
        });

        it('should fail if password field is not provided', (done) => {

            const body = { email: 'test@test.com' };

            const expectedErrorMessage = '\'password\' field is required';
            loginUser(body, expectedErrorMessage, done);
        });

        it('should fail if password field is invalid', (done) => {

            const body = { email: 'test@test.com', password: 'tt' };

            const expectedErrorMessage = 'Password must be between 4 to 16 characters';
            loginUser(body, expectedErrorMessage, done);
        });
    });

});
