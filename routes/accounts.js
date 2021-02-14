const express = require('express');
const router = express.Router();

const accountController = require('../controllers/account-controller');
const accountValidation = require('./validation/accountValidation');

router.post('/', accountValidation.createAccount, accountController.createAccount);
router.get('/', accountController.getAccounts);
router.get('/:accountId', accountValidation.getAccount, accountController.getAccount);

module.exports = router;
