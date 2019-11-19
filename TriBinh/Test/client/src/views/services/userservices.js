
export const userService={
    // setDataToStore,
    getUsers,
}

function getUsers(){
    let users = JSON.parse(localStorage.getItem("users")) || [];
    if(users){
        let users=[];
        for(var i=0;i<=20;i++){
            users.push({
            id:i+1,
            username:`user${i+1}`,
            password:"1",
            status:true
            });
        window.localStorage.setItem("users", JSON.stringify(users));
        }
    return users;
    }
}