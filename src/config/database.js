const { MongoClient } = require('mongodb'); 
const  url ="mongodb+srv://nayanank23:Nayaki23@nayananode.cr9nk.mongodb.net/" ;

const client = new MongoClient(url);
const dbName = "Hello";
async function main() {
  
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    
    const collection = db.collection('user');

    const insertResult = await collection.insertOne({
      firstName: "Nayana",
      lastName: "Kiran",
      location: "Bengaluru"
    });

    console.log('Inserted document =>', insertResult);
    //fetching the data
    const findResult = await collection.find({}).toArray();
    //console.log('Found documents =>', findResult);
    const filteredDocs = await collection.find({ firstName:"Nayana" }).toArray();
    // console.log('Found documents filtered by { firstName: Nayana } =>', filteredDocs);
     const updateResult = await collection.updateOne(  { firstName: "Nayana" },
      { $set: { age: 25 } });
// console.log('Updated documents =>', updateResult);
 //delete 
 //const deleteResult = await collection.deleteOne({ b: 1 }); // Ensure correct type
 //console.log('Delete result =>', deleteResult);

    return 'done.';
  }
  main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());