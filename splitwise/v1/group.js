// group.js
const db = require('./db');

class Group {
    constructor(id, name, createdBy) {
        this.id = id;
        this.name = name;
        this.createdBy = createdBy; // User ID of the group creator
    }

    // Create a new group
    async create() {
        try {
            const result = await db.query('INSERT INTO Groups (name, createdBy) VALUES (?, ?)',
                [this.name, this.createdBy]);
            this.id = result.insertId;
            console.log('Group created successfully');
        } catch (error) {
            console.error('Error creating group:', error);
        }
    }

    // Add a user as a member to the group
    async addMember(userId) {
        try {
            await db.query('INSERT INTO GroupMembers (groupId, userId) VALUES (?, ?)',
                [this.id, userId]);
            console.log('Member added to group');
        } catch (error) {
            console.error('Error adding member:', error);
        }
    }

    // Remove a user from the group
    async removeMember(userId) {
        try {
            await db.query('DELETE FROM GroupMembers WHERE groupId = ? AND userId = ?',
                [this.id, userId]);
            console.log('Member removed from group');
        } catch (error) {
            console.error('Error removing member:', error);
        }
    }

    // Get all members of the group
    async getMembers() {
        try {
            const members = await db.query('SELECT userId FROM GroupMembers WHERE groupId = ?', [this.id]);
            return members.map(member => member.userId);
        } catch (error) {
            console.error('Error fetching members:', error);
        }
    }

    // Get all expenses in the group
    async getExpenses() {
        try {
            const expenses = await db.query('SELECT * FROM Expenses WHERE groupId = ?', [this.id]);
            return expenses;
        } catch (error) {
            console.error('Error fetching expenses:', error);
        }
    }
}

module.exports = Group;
