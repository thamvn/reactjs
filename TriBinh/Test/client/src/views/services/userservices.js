import axios from 'axios';

export const userService={
    // setDataToStore,
    getUsers,
    loginUser,
    registerUser
}

function getUsers(){
    // let users = JSON.parse(localStorage.getItem("users")) || [];
    // if(users){
    //     let users=[];
    //     for(var i=0;i<=20;i++){
    //         users.push({
    //         id:i+1,
    //         username:`user${i+1}`,
    //         password:"1",
    //         status:true
    //         });
    //     window.localStorage.setItem("users", JSON.stringify(users));
    //     }
    // return users;
    // }
    return axios.get('/api/users')
                .then(res=>{return res.data})
                .catch(err=>{return console.log(err)});
}

function loginUser(users){
    return axios.post('/api/users/login',users)
                .then(res=>{return res.data})
                .catch(err=>{return console.log(err)});
}

function registerUser(user){
    return axios.post('/api/users/signup',user)
                .then(res=>{return res.data})
                .catch(err=>{return console.log(err)});
}