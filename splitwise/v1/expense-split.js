// expenseSplit.js
const db = require('./db');

class ExpenseSplit {
    constructor(id, expenseId, userId, amount) {
        this.id = id;
        this.expenseId = expenseId;
        this.userId = userId;
        this.amount = amount;
    }

    // Create a new split for an expense
    async create() {
        try {
            await db.query('INSERT INTO ExpenseSplits (expenseId, userId, amount) VALUES (?, ?, ?)',
                [this.expenseId, this.userId, this.amount]);
            console.log('Split created successfully');
        } catch (error) {
            console.error('Error creating split:', error);
        }
    }

    // Get details of the split
    async getSplitDetails() {
        try {
            const split = await db.query('SELECT * FROM ExpenseSplits WHERE id = ?', [this.id]);
            return split[0];
        } catch (error) {
            console.error('Error fetching split details:', error);
        }
    }
}

module.exports = ExpenseSplit;
