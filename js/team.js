import {getSavedTeamId, getTeam} from './api.js';
import {saveForLater, deleteSaveItem, getSavedTeamIdDb} from './db.js';


document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    const saveBtn = document.querySelector("#save");
    const delBtn = document.querySelector("#delete");

    getSavedTeamIdDb(id).then(team => {
        if(team){
            getSavedTeamId(id);
            saveBtn.style.display = "none";
            delBtn.style.display = "block";
        } else {
            const item = getTeam();
            saveBtn.style.display = "block";
            delBtn.style.display = "none";
        }
    })    

    saveBtn.addEventListener("click", () => {
        const item = getTeam();
        item.then(team => {
            saveForLater(team);
            saveBtn.style.display = "none";
            delBtn.style.display = "block";
        })
    })

    delBtn.addEventListener("click", () => {
        const item = getTeam();
        item.then(team => {
            deleteSaveItem(team)
            saveBtn.style.display = "block";
            delBtn.style.display = "none";
        })
    })
})

document.querySelectorAll("a.sidenav-trigger, .topnav a").forEach( btnElm => {
    console.log(btnElm)
    btnElm.addEventListener("click", () => {
        window.history.back();
    })
})