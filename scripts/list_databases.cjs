const { Client, Databases } = require('node-appwrite');

const client = new Client()
    .setEndpoint('https://sgp.cloud.appwrite.io/v1')
    .setProject('69d689a000002e4eec10')
    .setKey('standard_4ee22321ec49ff8a285d9159e1cd52c174b19bb68cffaebb75640bf42b5946a928332bc444a24924b077c9033b247423c2a100ef62ffe685c1cf19d48a7ad3318d27a705f6757f43f61790c2c6035289f627f0199a607f31b67ee2a8cc2458949c92f6c11846590d13be7b389f52b52bdeed58789b68f296cb4c951ae4f1d526');

const databases = new Databases(client);

async function check() {
    try {
        const list = await databases.list();
        console.log('Databases:', list.total);
        list.databases.forEach(db => {
            console.log(`- ${db.name} [ID: ${db.$id}]`);
        });
    } catch (e) {
        console.error(e.message);
    }
}

check();
