const { Client, Teams, Databases, Users, ID, Permission, Role } = require('node-appwrite');

const client = new Client()
    .setEndpoint('https://sgp.cloud.appwrite.io/v1')
    .setProject('69d689a000002e4eec10')
    .setKey('standard_4ee22321ec49ff8a285d9159e1cd52c174b19bb68cffaebb75640bf42b5946a928332bc444a24924b077c9033b247423c2a100ef62ffe685c1cf19d48a7ad3318d27a705f6757f43f61790c2c6035289f627f0199a607f31b67ee2a8cc2458949c92f6c11846590d13be7b389f52b52bdeed58789b68f296cb4c951ae4f1d526');

const teams = new Teams(client);
const databases = new Databases(client);
const users = new Users(client);

const DB_ID = 'school_management';
const roles = ['owner', 'admin', 'accountant', 'teacher'];

async function setup() {
    try {
        console.log('🚀 Starting Appwrite Setup...');

        // 1. Create Teams
        console.log('--- Creating Teams ---');
        for (const role of roles) {
            try {
                await teams.create(role, role);
                console.log(`✅ Team "${role}" created.`);
            } catch (e) {
                console.log(`ℹ️ Team "${role}" already exists or error: ${e.message}`);
            }
        }

        // 2. Create Database
        console.log('\n--- Creating Database ---');
        try {
            await databases.create(DB_ID, 'School Management System');
            console.log(`✅ Database "${DB_ID}" created.`);
        } catch (e) {
            console.log(`ℹ️ Database exists: ${e.message}`);
        }

        // 3. Create Collections
        console.log('\n--- Creating Collections ---');
        const collections = [
            { id: 'profiles', name: 'User Profiles' },
            { id: 'students', name: 'Students' },
            { id: 'finances', name: 'Finances' }
        ];

        for (const col of collections) {
            try {
                await databases.createCollection(DB_ID, col.id, col.name);
                console.log(`✅ Collection "${col.id}" created.`);
                
                // Add common attributes
                if (col.id === 'profiles') {
                    await databases.createStringAttribute(DB_ID, col.id, 'userId', 255, true);
                    await databases.createStringAttribute(DB_ID, col.id, 'role', 50, true);
                    await databases.createStringAttribute(DB_ID, col.id, 'name', 255, true);
                } else if (col.id === 'students') {
                    await databases.createStringAttribute(DB_ID, col.id, 'name', 255, true);
                    await databases.createStringAttribute(DB_ID, col.id, 'grade', 50, true);
                    await databases.createStringAttribute(DB_ID, col.id, 'status', 20, false, 'active');
                } else if (col.id === 'finances') {
                    await databases.createStringAttribute(DB_ID, col.id, 'title', 255, true);
                    await databases.createFloatAttribute(DB_ID, col.id, 'amount', true);
                    await databases.createStringAttribute(DB_ID, col.id, 'type', 20, true); // income/expense
                }
            } catch (e) {
                console.log(`ℹ️ Collection "${col.id}" setup info: ${e.message}`);
            }
        }

        // 4. Assign Owner
        console.log('\n--- Assigning Owner ---');
        const ownerEmail = 'gobinthakuri1995@gmail.com';
        try {
            const userList = await users.list([`equal("email", ["${ownerEmail}"])`]);
            if (userList.total > 0) {
                const userId = userList.users[0].$id;
                // Add to owner team (using email for membership)
                await teams.createMembership('owner', [], 'http://localhost:5173', ownerEmail, userId);
                console.log(`✅ Assigned ${ownerEmail} to "owner" team.`);
            } else {
                console.log(`⚠️ User ${ownerEmail} not found. They must log in once via Google first.`);
            }
        } catch (e) {
            console.log(`ℹ️ Owner assignment info: ${e.message}`);
        }

        console.log('\n🏁 Setup Complete!');
    } catch (error) {
        console.error('❌ Fatal Setup Error:', error.message);
    }
}

setup();
