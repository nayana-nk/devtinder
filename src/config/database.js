const { MongoClient } = require('mongodb'); 
const  url ="mongodb+srv://nayanank23:Nayaki23@nayananode.cr9nk.mongodb.net/" ;

const client = new MongoClient(url);
const dbName = "Hello";
async function main() {
  
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('user');

  
    return 'done.';
  }
  main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());