import { Client, Account,Databases,Storage, ID } from "appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('66795f4000158aa9d802');


const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

export { client, account, databases,storage, ID };


