import { openDB } from 'idb';

//this creates the database if it doesn't already exist
const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });


export const putDb = async (content) => {
  console.log("Post to the database");

  //create a connection to the jate database and specify the version
  const contactDb = await openDB("jate", 1);

  //create a transaction and specify the object store name and the data privileges
  const tx = contactDb.transaction("jate", "readwrite");

  //open the object store
  const store = tx.objectStore("jate");

  //the id for our data
  const id = 1;

  //add and update the data
  const request = store.put({id: id, value: content });

  //wait for the transaction to complete
  const result = await request;
  console.log("Data saved to the database", result);
};


// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');

  // create a connection to the jate database and specify the version
  const contactDb = await openDB('jate', 1);

  // create a transaction and specify the object store name and the data privileges
  const tx = contactDb.transaction('jate', 'readonly');

  // open the object store
  const store = tx.objectStore('jate');

  // get one item from the object store by id
  const request = store.get(1);

  // wait for the transaction to complete and only return the value
  const result = await request.value;
  console.log('result.value', result);
  return result;
};


initdb();
