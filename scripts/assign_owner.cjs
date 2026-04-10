const { Client, Teams, Users } = require('node-appwrite');

const client = new Client()
    .setEndpoint('https://sgp.cloud.appwrite.io/v1')
    .setProject('69d689a000002e4eec10')
    .setKey('standard_4ee22321ec49ff8a285d9159e1cd52c174b19bb68cffaebb75640bf42b5946a928332bc444a24924b077c9033b247423c2a100ef62ffe685c1cf19d48a7ad3318d27a705f6757f43f61790c2c6035289f627f0199a607f31b67ee2a8cc2458949c92f6c11846590d13be7b389f52b52bdeed58789b68f296cb4c951ae4f1d526');

const teams = new Teams(client);
const users = new Users(client);

async function assignOwner() {
    const ownerEmail = 'gobinthakuri1995@gmail.com';
    try {
        console.log(`Checking for user: ${ownerEmail}`);
        const userList = await users.list();
        const user = userList.users.find(u => u.email === ownerEmail);
        
        if (user) {
            const userId = user.$id;
            console.log(`User found: ${userId}. Assigning to owner team...`);
            await teams.createMembership('owner', [], 'http://localhost:5173', ownerEmail, userId);
            console.log(`✅ Assigned ${ownerEmail} to "owner" team.`);
        } else {
            console.log(`⚠️ User ${ownerEmail} not found. Please log in to the app first once.`);
        }
    } catch (e) {
        console.error('Error:', e.message);
    }
}

assignOwner();
