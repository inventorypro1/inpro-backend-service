const createError = require('http-errors');
const Account = require('../models/Account');

async function createAccount(account) {

    console.log('Creating an account in account-service.js');

    // check if the account with email already exists
    const existingAccount = await Account.findOne({ email: account.email });

    if (existingAccount) {
        return Promise.reject(createError(409, `Account already exists with email ${account.email}`));
    }

    const newAccount = new Account({
        name: account.name,
        email: account.email,
        users: []
    });

    await newAccount.save();
    return newAccount;
}

async function getAccount(accountId) {

    const account = await Account.findById(accountId);

    if (!account) {
        return Promise.reject(createError(404, `No account with ID ${accountId}`));
    }

    return account;
}

function getAccounts() {

    return Account.find();
}

async function addUserToAccount(accountId, userId) {

    await Account.updateOne({ _id: accountId }, { $push: { users: userId } });

    console.log(`User ${userId} added successfully to account ${accountId} list of users`);

    return Promise.resolve();
}

module.exports = {
    createAccount,
    getAccount,
    getAccounts,
    addUserToAccount
};
