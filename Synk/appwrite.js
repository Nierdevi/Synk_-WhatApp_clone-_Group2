import { Client, Account, ID } from "appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('66795f4000158aa9d802');
const account =  new Account(client)
async function createUser(phoneNumber){
    const token = await account.createPhoneToken(
        ID.unique(),
        phoneNumber
    );
    console.log(token)

    return token;

}
async function verifyUser(recievedtoken,userEntered){
    const session = await account.createSession(
        recievedtoken.userId,
        userEntered
    );
    return session
}
export {createUser,verifyUser} 


