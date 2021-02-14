const accountService = require('../services/account-service');

function createAccount(request, response, next) {

    const account = request.body;

    return accountService.createAccount(account)
        .then((result) => response.status(201).json(result))
        .catch((err) => next(err));
}

function getAccount(request, response, next) {

    const accountId = request.params.accountId;

    return accountService.getAccount(accountId)
        .then((result) => response.status(200).json(result))
        .catch((err) => next(err));
}

function getAccounts(request, response, next) {

    return accountService.getAccounts()
        .then((result) => response.status(200).json(result))
        .catch((err) => next(err));
}

module.exports = {
    createAccount,
    getAccount,
    getAccounts
};
