import axios from 'axios';

export async function getKey(uuid){
  uuid = await axios.get("")

  try {
    const user =  await this.request.get(`https://authrocket.herokuapp.com/v1/users/getkey/${uuid}`)

    if(user){
      
        return {err:null , key:user.data.apiKey}
    }

    return null

 } catch (err) {
      return {err:err , key:null}
 }
}