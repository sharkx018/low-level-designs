
const User = require('./user');
const Group = require('./group');
const Expense = require('./expense');
const ExpenseSplit = require('./expense-split');
const Settlement = require('./settlement');

async function main() {
    try {
        // Register Users
        const userA = new User(null, 'Alice', 'alice@example.com', 'password123');
        const userB = new User(null, 'Bob', 'bob@example.com', 'password123');
        await userA.register();
        await userB.register();

        // Create a Group
        const group = new Group(null, 'Friends Trip', userA.id);
        await group.create();
        await group.addMember(userA.id);
        await group.addMember(userB.id);

        // Add an Expense
        const splits = [
            new ExpenseSplit(null, null, userA.id, 25),
            new ExpenseSplit(null, null, userB.id, 25)
        ];
        const expense = new Expense(null, group.id, 'Dinner', 50, userA.id, splits);
        await expense.create();

        // Settle an Amount
        const settlement = new Settlement(null, userB.id, userA.id, 10, group.id);
        await settlement.create();

        // Check balances
        const balanceA = await userA.getBalance();
        const balanceB = await userB.getBalance();
        console.log(`Alice's Balance: ${balanceA}`);
        console.log(`Bob's Balance: ${balanceB}`);
    } catch (error) {
        console.error('Error in app:', error);
    }
}

main();
