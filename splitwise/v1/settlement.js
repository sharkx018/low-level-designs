// settlement.js
const db = require('./db');

class Settlement {
    constructor(id, payerId, payeeId, amount, groupId = null) {
        this.id = id;
        this.payerId = payerId;
        this.payeeId = payeeId;
        this.amount = amount;
        this.groupId = groupId;
    }

    // Create a new settlement and update user balances
    async create() {
        try {
            await db.query(
                'INSERT INTO Settlements (payerId, payeeId, amount, groupId) VALUES (?, ?, ?, ?)',
                [this.payerId, this.payeeId, this.amount, this.groupId]
            );

            // Update the net balance of the payer and payee
            await this.updateUserBalance(this.payerId, this.payeeId, this.amount);

            console.log('Settlement created and balances updated successfully');
        } catch (error) {
            console.error('Error creating settlement:', error);
        }
    }

    // Update the net balance between payer and payee
    async updateUserBalance(payerId, payeeId, amount) {
        try {
            // Decrease the balance of the payer (since they paid money)
            await db.query(`
                UPDATE Balances 
                SET netBalance = netBalance + ? 
                WHERE userId = ?`,
                [-amount, payerId]
            );

            // Increase the balance of the payee (since they received money)
            await db.query(`
                UPDATE Balances 
                SET netBalance = netBalance + ? 
                WHERE userId = ?`,
                [amount, payeeId]
            );

            console.log(`Balance updated for payer: ${payerId} (-${amount}) and payee: ${payeeId} (+${amount})`);
        } catch (error) {
            console.error('Error updating user balance:', error);
        }
    }
}

module.exports = Settlement;
