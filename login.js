let usernname = "Somdutt";
let password = "greatlearning";

localStorage.setItem("username",JSON.stringify(usernname));
localStorage.setItem("password",JSON.stringify(password));

// Login validation

let spanUname = document.getElementById("invalid-uname")
let spanPword = document.getElementById("invalid-pword")

let submit = document.getElementById("submit")
let providedUsername = document.getElementById("uname")
let providedPassword = document.getElementById("pword")
submit.addEventListener("click",()=>{
    spanUname.innerText=""
    spanPword.innerText=""
    if(providedUsername.value==="" && providedPassword.value===""){
        spanUname.style.color = "red"
        spanUname.innerText= "Username not provided"
        spanPword.style.color = "red"
        spanPword.innerText= "Password not provided"
    }
    else if(providedUsername.value===""){
        spanUname.style.color = "red"
        spanUname.innerText= "Username not provided"
    }
    else if(providedPassword.value===""){
        spanPword.style.color = "red"
        spanPword.innerText= "Password not provided"
    }
    else if(providedUsername.value!==JSON.parse(localStorage.getItem('username')) &&providedPassword.value!==JSON.parse(localStorage.getItem('password'))){
        spanUname.style.color = "red"
        spanUname.innerText= "Invalid Username"
        spanPword.style.color = "red"
        spanPword.innerText= "Invalid Password"
    }
    else if(providedUsername.value!==JSON.parse(localStorage.getItem('username'))){
        spanUname.style.color = "red"
        spanUname.innerText= "Invalid Username"
    }
    else if(providedPassword.value!==JSON.parse(localStorage.getItem('password'))){
        spanPword.style.color = "red"
        spanPword.innerText= "Invalid Password"
    }
    else{
        localStorage.setItem('isLoggedIn',JSON.stringify(true))
        window.location.href="resume.html"
    }
    
})