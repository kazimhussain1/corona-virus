const mongo = require('mongodb');



const password = '0900786001'
const url = `mongodb+srv://superuser:${password}@corona-api-data-hmxfr.mongodb.net/test?retryWrites=true&w=majority`;

const client = new mongo.MongoClient(url);

// async function listDatabases(client){
//     databasesList = await client.db().admin().listDatabases();
 
//     console.log("Databases:");
//     databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// };


// async function main(){
//     /**
//      * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
//      * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
//      */
    


//     try {
//         // Connect to the MongoDB cluster
//         await client.connect();
 
//         // Make the appropriate DB calls
//         await  listDatabases(client);
 
//     } catch (e) {
//         console.error(e);
//     } finally {
//         await client.close();
//     }
// }

// main().catch(console.error);

module.exports = client;