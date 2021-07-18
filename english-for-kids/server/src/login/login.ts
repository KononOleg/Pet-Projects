import { token } from "../database";



export async function logIn(login:string,password:string ): Promise<void> {
  const data =  await token.find({}); 
  const FIRST_PAGE=0;
  if(data[FIRST_PAGE].login === login && data[FIRST_PAGE].password === password ) return Promise.resolve();
  else return Promise.reject()
}