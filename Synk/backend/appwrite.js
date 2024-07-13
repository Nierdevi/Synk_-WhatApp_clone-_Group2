import { Client, Account,Databases, ID } from "appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('66795f4000158aa9d802');


const account = new Account(client);
const databases = new Databases(client);

export { client, account, databases, ID };


