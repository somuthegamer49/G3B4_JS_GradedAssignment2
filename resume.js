// logout functionality
let logoutbtn = document.getElementsByClassName("logout")

logoutbtn[0].addEventListener("click",()=>{
    localStorage.clear()
    window.location.href="index.html"
})
let remove = document.getElementsByClassName("remove")
let resumebody = document.getElementsByClassName("resume")

// Extracted Data

let resumedata=new Array();
async function Resumes(){
    try{
        let request = await fetch('./Data.json')
        let json = await request.json()
        for(data of json.resume){
            resumedata.push(data)
        }
    }
    catch{
        pageErr()
        throw new Error("some problem with server")
    }
    
}
// Mapping Data
let NameApplicant = document.getElementsByClassName("applicant-name")
let AppliedFor = document.getElementsByClassName("applied-for")
let phone = document.getElementById("phone")
let email =document.getElementById("email")
let linkedin =document.getElementById("linkedin")
let address =document.getElementById("address")
let postal =document.getElementById("postal")
let city =document.getElementById("city")
let state =document.getElementById("state")
let network =document.getElementById("network")
let url =document.getElementById("url")
let skillName = document.getElementById("skill-name")
let proficiency = document.getElementById("proficiency")
let techskills = document.getElementsByClassName("tech")
let hobbies = document.getElementsByClassName("hobbies")
let company = document.getElementById("company-name")
let position = document.getElementById("position")
let start_date = document.getElementById("start")
let end_date = document.getElementById("end")
let summary = document.getElementById("summary")
let project_name = document.getElementById("project")
let project_summary = document.getElementById("project-desc")
let educationUG = document.getElementsByClassName("education1")
let educationSC = document.getElementsByClassName("education2")
let educationHS = document.getElementsByClassName("education3")
let intern_company = document.getElementById("intern-company")
let intern_position = document.getElementById("intern-position")
let intern_start_date = document.getElementById("intern-start")
let intern_end_date = document.getElementById("intern-end")
let intern_summary_desc = document.getElementById("summary-desc")
let achievements = document.getElementById("achievements")
let next = document.getElementsByClassName("next")
let previous = document.getElementsByClassName("previous")

let i = 0;
async function initiate(){
    await Resumes()
    pageMap(i)
    Search(resumedata)
    buttonWork(i)
}

function buttonWork(i){
    pageMap(i)
    next[0].addEventListener("click",()=>{
        i =  Math.min(++i,resumedata.length-1);
        pageMap(i)
     })
    
     previous[0].addEventListener("click",()=>{
         i =  Math.max(--i,0);
         pageMap(i)
      })
}
function pageMap(i){
    remove[0].style.display="none"
    resumebody[0].style.display="block"
    techskills[0].innerHTML=`<p><p>`
    hobbies[0].innerHTML=`<p><p>`
    achievements.innerHTML=``
    NameApplicant[0].innerText=resumedata[i].basics.name
    AppliedFor[0].innerText=resumedata[i].basics.AppliedFor
    phone.innerText=resumedata[i].basics.phone
    email.innerText=resumedata[i].basics.email
    techskills[0].innerHTML+=`<strong><p>${resumedata[i].skills.name}</p></strong>`
    techskills[0].innerHTML+=`<strong><p>${resumedata[i].skills.level}</p></strong>`
    resumedata[i].skills.keywords.forEach((skill)=>{
        techskills[0].innerHTML+=`<p>${skill}</p>`
    })
    resumedata[i].interests.hobbies.forEach((hobby)=>{
        hobbies[0].innerHTML+=`<p>${hobby}</p>`
    })
    company.innerText=resumedata[i].work.CompanyName
    position.innerText=resumedata[i].work.Position
    start_date.innerText=resumedata[i].work.StartDate
    end_date.innerText=resumedata[i].work.EndDate
    summary.innerText=resumedata[i].work.Summary
    intern_company.innerText=resumedata[i].Internship.CompanyName
    intern_position.innerText=resumedata[i].Internship.Position
    intern_start_date.innerText=resumedata[i].Internship.StartDate
    intern_end_date.innerText=resumedata[i].Internship.EndDate
    intern_summary_desc.innerText=resumedata[i].Internship.Summary
    project_name.innerText=resumedata[i].projects.name
    project_summary.innerText=resumedata[i].projects.description
    educationUG[0].innerText=resumedata[i].education.UG.institute
    educationUG[1].innerText=resumedata[i].education.UG.course
    educationUG[2].innerText=resumedata[i].education.UG.StartDate
    educationUG[3].innerText=resumedata[i].education.UG.EndDate
    educationUG[4].innerText=resumedata[i].education.UG.cgpa
    educationSC[0].innerText=resumedata[i].education.SeniorSecondary.institute
    educationSC[1].innerText=resumedata[i].education.SeniorSecondary.cgpa
    educationHS[0].innerText=resumedata[i].education.HighSchool.institute
    educationHS[1].innerText=resumedata[i].education.HighSchool.cgpa
    resumedata[i].achievements.Summary.forEach(ach=>{
        achievements.innerHTML+=`<li>
        <p>
            ${ach}
        </p>
      </li>`
    })
    address.innerText=resumedata[i].basics.location.address
    postal.innerText=resumedata[i].basics.location.postalCode
    city.innerText=resumedata[i].basics.location.city
    state.innerText=resumedata[i].basics.location.state
    url.innerText=resumedata[i].basics.profiles.url
}
 initiate()

//  Search Functionality

function Search(resumes){
    let searchbox = document.getElementById("search")
    searchbox.addEventListener("keyup",(event)=>{
        let success = false;
        let rollback = false;
        let searchindex = [];
        if(event.key==="Enter"){
        let input = event.target.value
        resumes.forEach((data,index)=>{
            if(input===""){
                rollback=true
                i=0
                buttonWork(i)
            }
            else if(data.basics.name.includes(input.trim())){
                searchindex.push(index)
                success=true
            }
            else if(data.basics.AppliedFor.includes(input.trim())){
                searchindex.push(index)
                success=true
            } 
            if(searchindex.length>0 && !rollback){
                checkSearch(searchindex)
        }
        })
        if(!success&&!rollback){
            pageErr()
        }
    }
    })
   
}
function pageErr(){
    resumebody[0].style.display="none"
    remove[0].style.display="block"
}

function checkSearch(arr){
    if(Array.isArray(arr)){
    let j = 0;
    pageMap(arr[j])
    next[0].addEventListener("click",()=>{
        j =  Math.min(++j,arr.length-1);
        pageMap(arr[j])
     })
    
     previous[0].addEventListener("click",()=>{
         j =  Math.max(--j,0);
         pageMap(arr[j])
      })
    }
}