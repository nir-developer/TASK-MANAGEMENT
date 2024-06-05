const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')


const userSchema = mongoose.Schema({
    name:{
        type:String, 
        required:[true,'User name is required']
        
    }, 
    email:{
        type:String, 
        required:[true ,'Email is required'],
        unique:true
    },
    password: {
        type:String, 
        required:[true,'Password name is required'],
        minLength:4, 
        select:false
    },
     passwordConfirm: {
        type:String, 
        required:[true,'Password name is required'],
        minLength:4, 
        validate:{
            validator: function(el){
                return el === this.password
            },
            message:'Password are not the same'
        }
       // validator:
    }
    ,role:{
        type:String, 
        required:[true, 'Role is required'], 
        enum:['user', 'admin'], 
        default:'user'

    }, 
    photo:String, 
     tasks: [{type: mongoose.Schema.Types.ObjectId ,ref: 'Task', required: true}]

})



//PRE-SAVE M.W TO HASH THE PASSWORD! 
userSchema.pre('save',async function(next){
  
    if(!this.isModified('password') ) return next();

    //Update the password to the hash value
    this.password =  await bcrypt.hash(this.password, 12);

    //PREVENT THE CONFIRM PASSWORD FROM BEING SAVED TO DB(OK DOES NOT IN THE DB AND NOT IN THE DB)
    this.passwordConfirm = undefined;

    //WILL SAVE THE USER
    next();
    
})



//INSTANCE METHOD FOR CHECKING IF PASSWORD AND PASSWORD CONFIRM ARE THE SAME
userSchema.methods.correctPassword = async (candidatePassword, userPassword) => {
    console.log(`USER MODEL correctPassword : candidatePassword:${candidatePassword}, 
    userPassword: ${userPassword }`)
    const isCorrect = await  bcrypt.compare(candidatePassword, userPassword)
    console.log('USER MODEL - correctPassword: ' ,isCorrect)
    return isCorrect;
}

const User = new mongoose.model('User', userSchema)


module.exports = User;