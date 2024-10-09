// expense.js
const db = require('./db');
const ExpenseSplit = require('./expenseSplit');

class Expense {
    constructor(id, groupId, description, amount, paidBy, splits = []) {
        this.id = id;
        this.groupId = groupId;
        this.description = description;
        this.amount = amount;
        this.paidBy = paidBy;
        this.splits = splits;
    }

    // Create a new expense and update user balances
    async create() {
        try {
            const result = await db.query(
                'INSERT INTO Expenses (groupId, description, amount, paidBy) VALUES (?, ?, ?, ?)',
                [this.groupId, this.description, this.amount, this.paidBy]
            );
            this.id = result.insertId;

            // Create splits and update balances
            for (let split of this.splits) {
                split.expenseId = this.id;
                await split.create();

                // Update the balance of the paidBy user (credit) and the user in split (debit)
                await this.updateUserBalance(this.paidBy, split.userId, split.amount);
            }

            console.log('Expense created and balances updated successfully');
        } catch (error) {
            console.error('Error creating expense:', error);
        }
    }

    // Update the net balance of two users
    async updateUserBalance(paidBy, userId, amount) {
        try {
            // If the payer is paidBy, we need to increase their net balance
            await db.query(`
                UPDATE Balances 
                SET netBalance = netBalance + ? 
                WHERE userId = ?`,
                [amount, paidBy]
            );

            // The user who owes money has their net balance decreased
            await db.query(`
                UPDATE Balances 
                SET netBalance = netBalance - ? 
                WHERE userId = ?`,
                [amount, userId]
            );

            console.log(`Balance updated for paidBy: ${paidBy} (+${amount}) and userId: ${userId} (-${amount})`);
        } catch (error) {
            console.error('Error updating user balance:', error);
        }
    }
}

module.exports = Expense;
