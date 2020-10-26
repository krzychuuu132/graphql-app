
export const handleDeleteBooking  = async (id,token) => {

    const requestBody = {

        query: `
        mutation CancelBooking($id: ID!) {
            cancelBooking(bookingsID: $id){
             _id
             title
             description
             price
             date
           }
           }
        `,
         variables:{
             id: id
         }  
        
    }

    const jsonData  = JSON.stringify(requestBody);

    try{
         const bookings = await fetch('https://graphql-express-app123.herokuapp.com/graphql',{
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