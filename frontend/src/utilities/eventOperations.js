

export const bookEvent =  (id,token) =>{
   
    const requestBody = {

        query: `
        mutation BookEvent($id: ID!){
            bookEvent(eventId : $id){
               _id
              createdAt
              updatedAt
             
            }
            }
        `,
        variables:{
            id
        }
        
    }

    const jsonData  = JSON.stringify(requestBody);

    return fetch('http://localhost:3000/graphql',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        },
        body:jsonData
    })
    .then(res=>{
        if(res.status !== 200 && res.status !== 201 && res.status !== 500){
            throw new Error('Failed!')
        }
        console.log(jsonData)
        return res.json();
    })
    .then(result=>result)
    .catch(err=>{
        throw err;
    })
    
}

export const getBookings = async (token) => {

    const requestBody = {

        query: `
        query{
            bookings{
              _id
              event{
                 title
                 price
              }
              user{
                email
              }
            }
          }
        `
    
        
    }

    const jsonData  = JSON.stringify(requestBody);

    try{
         const bookings = await fetch('http://localhost:3000/graphql',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            },
            body:jsonData
        });

        const response = await bookings.json();

        return response.data;

    } catch(err){
        throw Error(err);
    }

 

}

export const  fetchEvents  = async () =>{

    const requestBody = {

        query: `
        query{
            events{
               _id
              title
              description
              price
              date
              creator{
                _id
                email
                createdEvents{
                  _id
                  title
                }
              
              }
            }
            }
        `
    
        
    }

    const jsonData  = JSON.stringify(requestBody);

   try{

    
    const response = await  fetch('http://localhost:3000/graphql',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            
        },
        body:jsonData
     })

     const { data } = await response.json();
    
     
     return data

   } catch(err){
    throw Error(err)
   }
    
    

     

}

export const createEvent = async (title,price,date,text,token) => {
    
    const requestBody = {

        query: `
        mutation CreateEvent($title : String!,$text: String!,$price: Float!,$date: String!){
            createEvent(eventInput:{
              title: $title,
              description: $text,
              price: $price,
              date: $date
              
            }){
                _id
                title
                description
                price
                date
                creator{
                    _id
                    email
                }
            }
          }
        `,
    variables:{
        title,
        text,
        price,
        date,
        
      
    }
        
    }
    
    
    
    
    const jsonData  = JSON.stringify(requestBody);

try{

    const response = await fetch('http://localhost:3000/graphql',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        },
        body:jsonData
     });
    
    const data = response.json();
    
     return data;

} catch (err){
    throw Error(err);
}
}