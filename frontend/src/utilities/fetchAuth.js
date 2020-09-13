

export const fetchAuth = (login,email,password) =>{

    let requestBody;

    if(login){

    requestBody = {
            query:`
            query{
                login(email:"${email}",password:"${password}"){
                  userId
                  token
                  tokenDuration
                }
              }
            `
        }
    }

    else{

     requestBody  = {
        query: `
        mutation {
            createUser(userInput:{
              email:"${email}"
              password:"${password}"
            }){
              _id
              email
              password
            }
          }
        `
    }
    }
    
    const jsonData  = JSON.stringify(requestBody);

 return fetch('http://localhost:3000/graphql',{
    method:'POST',
    headers:{
        'Content-Type':'application/json'
    },
    body:jsonData
})
.then(res=>{
    if(res.status !== 200 && res.status !== 201 && res.status !== 500){
        throw new Error('Failed!')
    }

    return res.json();
})
.then(result=>result)
.catch(err=>{
    throw err;
})

}
