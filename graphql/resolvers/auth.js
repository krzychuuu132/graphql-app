const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');  

const userResolver = {

    createUser:async (args)=>{

       try{
         const { userInput: arg } = args;    
            
        const existingUser = await User.findOne({email: arg.email});

             if(existingUser) {
                 throw new Error('User already exists');
             }
            
             const hashedPassword =  await bcrypt.hash(arg.password, 12);
          
             const user = new User({
                email: arg.email,
                password: hashedPassword
            })

          const result = await  user.save();
        

          return {...result._doc,password:null,_id: result.id};

        } catch(err){
            throw err;
        }
      
    },

    login: async({email,password})=>{
        

        const user = await User.findOne({email: email})

        if(!user){
            throw new Error('user doesnt exist')
        }

        const isEqual = await bcrypt.compare(password,user.password);

       

        if(!isEqual){
            throw new Error('Password is incorrect');
        }

        const token = jwt.sign({userId: user.id,email: user.email},'secretkey',{
            expiresIn: '1h'
        });
        return{
            userId: user.id,
            token,
            tokenDuration: 1
        }
    }

}

module.exports = userResolver;