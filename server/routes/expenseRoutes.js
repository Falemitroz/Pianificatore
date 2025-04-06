const express = require('express');
const router = express.Router();

const expenseController = require('../controllers/expenseController');

router.post('/create-expense', expenseController.createExpense);
router.get('/trip-expenses/:tripID', expenseController.getExpensesByTrip);
router.get('/user-expenses/:userID', expenseController.getExpensesByUser);
router.get('/:expenseID', expenseController.getExpenseById);
router.put('/:expenseID', expenseController.updateExpense);
router.delete('/:expenseID', expenseController.deleteExpense);


module.exports = router;