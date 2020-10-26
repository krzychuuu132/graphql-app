

export const fetchAuth = (login,password,email) =>{
  

    let requestBody;

 

    if(login){

    requestBody = {
            query:`
            query Login($email : String!,$password: String!){
                login(email: $email,password: $password){
                  userId
                  token
                  tokenDuration
                }
              }
            `,
            variables:{
              email,
              password
            }
        }
    }

    else{

     requestBody  = {
        query: `
        mutation Register($email : String!,$password: String!){
            createUser(userInput:{
              email:$email
              password: $password
            }){
              _id
              email
              password
            }
          }
        `,
        variables:{
          email,
          password
        }
    
    }
    }
    
    const jsonData  = JSON.stringify(requestBody);

return fetch('https://graphql-express-app123.herokuapp.com/graphql',{
    method:'POST',
    headers:{
        'Content-Type':'application/json'
    },
    body:jsonData
})
.then(res=>{
  
    if(res.status !== 200 && res.status !== 201 && res.status !== 500){
        return res.json()
    }
    
    return res.json();
})
.then(result=>{
  console.log(result)
  return result;
})
.catch(err=>{
 
   return err;
})

}
