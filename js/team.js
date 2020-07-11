import {getSavedTeamId, getTeam} from './api.js';
import {saveForLater} from './db.js';
document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    const isFromSaved = urlParams.get("saved");
    const saveBtn = document.querySelector("#save");

    if(isFromSaved){
        getSavedTeamId(id);

        saveBtn.style.display = "none";
    } else {
        const item = getTeam();

        saveBtn.addEventListener("click", () => {
            item.then(team => {
                console.log(team);
                saveForLater(team);
                saveBtn.style.display = "none";
            })
        })
    }
    
})