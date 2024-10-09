// user.js
const db = require('./db');

class User {
    constructor(id, name, email, password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    // Get the balance sheet for the user
    async getBalanceSheet() {
        try {
            // Step 1: Fetch all expenses involving the user
            const expenses = await db.query(`
                SELECT e.id AS expenseId, e.paidBy, es.userId, es.amount AS splitAmount 
                FROM Expenses e 
                JOIN ExpenseSplits es ON e.id = es.expenseId 
                WHERE es.userId = ? OR e.paidBy = ?`,
                [this.id, this.id]);

            // Step 2: Fetch all settlements involving the user
            const settlements = await db.query(`
                SELECT payerId, payeeId, amount 
                FROM Settlements 
                WHERE payerId = ? OR payeeId = ?`,
                [this.id, this.id]);

            // Step 3: Calculate net balances with other users from expenses
            let balanceMap = new Map(); // userId -> net balance with this user

            for (let expense of expenses) {
                const paidBy = expense.paidBy;
                const splitUserId = expense.userId;
                const splitAmount = expense.splitAmount;

                // If the user paid, they are owed by others
                if (paidBy === this.id && splitUserId !== this.id) {
                    if (!balanceMap.has(splitUserId)) balanceMap.set(splitUserId, 0);
                    balanceMap.set(splitUserId, balanceMap.get(splitUserId) + splitAmount);
                }

                // If the user didn't pay, they owe the payer
                if (splitUserId === this.id && paidBy !== this.id) {
                    if (!balanceMap.has(paidBy)) balanceMap.set(paidBy, 0);
                    balanceMap.set(paidBy, balanceMap.get(paidBy) - splitAmount);
                }
            }

            // Step 4: Adjust balances with settlements
            for (let settlement of settlements) {
                const payerId = settlement.payerId;
                const payeeId = settlement.payeeId;
                const amount = settlement.amount;

                if (payerId === this.id) {
                    // If the user is the payer, they have settled an amount to another user
                    if (!balanceMap.has(payeeId)) balanceMap.set(payeeId, 0);
                    balanceMap.set(payeeId, balanceMap.get(payeeId) - amount);
                } else if (payeeId === this.id) {
                    // If the user is the payee, they have received an amount from another user
                    if (!balanceMap.has(payerId)) balanceMap.set(payerId, 0);
                    balanceMap.set(payerId, balanceMap.get(payerId) + amount);
                }
            }

            // Step 5: Create a readable balance sheet
            const balanceSheet = [];
            for (let [userId, balance] of balanceMap.entries()) {
                if (balance > 0) {
                    balanceSheet.push({ owedBy: userId, amount: balance });
                } else if (balance < 0) {
                    balanceSheet.push({ owesTo: userId, amount: -balance });
                }
            }

            return balanceSheet;
        } catch (error) {
            console.error('Error generating user balance sheet:', error);
        }
    }
}

module.exports = User;
