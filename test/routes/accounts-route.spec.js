/* global beforeEach describe it */
const { expect } = require('chai');

const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');

const accountRoutes = require('../../routes/accounts');

describe('Account tests', () => {

    let app;

    function validationError(err, req, res, next) {
        next(err);
    }

    beforeEach(() => {
        app = express();
        app.use(bodyParser.json());
        app.use('/', accountRoutes);
        app.use(validationError);
    });

    describe('Tests for POST /api/accounts endpoint validation', () => {

        function createAccount(body, expectedErrorMessage, done) {

            request(app)
                .post('/')
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

            const body = { email: 'test@test.com' };

            const expectedErrorMessage = '\'name\' field is required';
            createAccount(body, expectedErrorMessage, done);
        });

        it('should fail if name field is invalid', (done) => {

            const body = { email: 'test@test.com', name: 'gf' };

            const expectedErrorMessage = 'Name must be between 3 and 20 characters long';
            createAccount(body, expectedErrorMessage, done);
        });

        it('should fail if email field is not provided', (done) => {

            const body = { name: 'test' };

            const expectedErrorMessage = '\'email\' field is required';
            createAccount(body, expectedErrorMessage, done);
        });

        it('should fail if name field is invalid', (done) => {

            const body = { email: 'invalid', name: 'test' };

            const expectedErrorMessage = 'Email provided is not valid';
            createAccount(body, expectedErrorMessage, done);
        });
    });

    describe('Tests for GET /api/accounts/{accountId} endpoint validation', () => {

        function getAccount(accountId, expectedErrorMessage, done) {

            request(app)
                .get(`/${accountId}`)
                .end((err, res) => {
                    expect(res.statusCode).to.equal(422);

                    const errors = JSON.parse(res.text).errors;

                    const errorMessage = errors[0].msg;
                    expect(errorMessage).to.equal(expectedErrorMessage);
                    done();
                });
        }

        it('should fail if accountId field is not valid', (done) => {

            const expectedErrorMessage = 'Account ID is not a valid object ID';
            getAccount('accountId=45f', expectedErrorMessage, done);
        });
    });
});
