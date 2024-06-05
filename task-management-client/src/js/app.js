
console.log('TOP LEVEL - FIRST LINE OF SCRIPT - isLoggedIn in the L.S:')
console.log(localStorage.getItem('isLoggedIn'))

const apiBaseURL = 'http://localhost:3000/api/v1/users'

//STATE OBJECT 
const state = {
    isLoggedIn:false,
    username: '',
    statusMessage:'', 
    currentAccount:null
    
}


//SELECT DOM ELEMENTS 
const headerMessage = document.querySelector('.header__message')
const headerUser = document.querySelector('.header__user')


//FORMS
const formLogin = document.querySelector('.form--login')
const formSignup = document.querySelector('.form--signup')
const formLoginInputEmail = document.getElementById('login-email')
const formLoginInputPassword = document.getElementById('login-password')



// const updateUI = () => {

//     console.log('updateUI - before if-else - the isLoggedIn in L.S:')
//     console.log(localStorage.getItem('isLoggedIn'))
//     //CLEAR FORM INPUT FIELDS
//     formLoginInputEmail.value = formLoginInputPassword.value = ''

//     //REMOVE THE FOCUS CURSOR FROM THE INPUTS 
//     formLoginInputEmail.blur(); 
//     formLoginInputPassword.blur(); 
    
//     if(state.isLoggedIn === true) 
//     {
//         document.querySelector('.header__username').textContent = state.currentAccount.name
//         console.log('INSIDE updateUI - THE isLoggedIn = ', state.isLoggedIn)

//         console.log('INSIDE updateUI - THE isLoggedIn in L.S: = ', localStorage.getItem('isLoggedIn'))

//         headerMessage.style.display='none'
//         headerUser.style.display='block'
//         // headerUser.classList.add('.header__user')
//         console.log(headerUser)
//     }
//     else 
//     {
//         headerMessage.style.display='block'
       
//         headerUser.style.display='none'

//     }
// }



formLogin.addEventListener('submit', async (event) => {

    event.preventDefault();

    // const email = formLoginInputEmail.value;
    // const password =formLoginInputPassword.value;
    

    try{
       
        const response = await fetch(`${apiBaseURL}/login`, {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({email, password}),
        credentials: 'include'

        })

        const responseBody = await response.json();

        if(response.ok)
        {

            console.log('Login Successful - the user:')
           
            const {user} = responseBody.data
            console.log(user);

            //UPDATE THE STATE
            state.isLoggedIn = true;
            state.currentAccount = user; 


            //STORE LOGIN IN THE LOCAL STORAGE 
            localStorage.setItem('isLoggedIn', state.isLoggedIn)


            
            //LOAD THE UI 
            updateUI();
        }

        else
        {
            throw responseBody;
        }
      

        //RENDER THE USER PROFILE BASED ON THE STATE 
        // userProfile.textContent = state.isLoggedIn === true ? `Logged in as: ${user.name}`: `Bad Credentials`

    }
    catch(error)
    {
        console.error('Login Failed', error.message)
    }


})



updateUI(); 



