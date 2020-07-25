import {getCompetitions, scheduleMatch, getSavedTeam} from './api.js';

document.addEventListener("DOMContentLoaded", () => {
    const sidenavElm = document.querySelector(".sidenav");
    let page = window.location.hash.substr(1);

    M.Sidenav.init(sidenavElm);
    loadNav();

    if (page === "") page = "home";
    loadPage(page);
});

const loadNav = () => {
    fetch("nav.html")
    .then(response => {
        if (response.status !== 200 ) throw response.statusText+" Nav tidak dapat diakses!";

        return response.text();
    }) .then(responseText => {
        if (responseText) {
            document.querySelectorAll(".topnav, .sidenav").forEach((elm) => {
                elm.innerHTML = responseText;
            });
    
            document.querySelectorAll(".topnav a, .sidenav a").forEach((btnElm) => {
                btnElm.addEventListener("click", (event) => {
                    const sidenavElm = document.querySelector(".sidenav");
                    M.Sidenav.getInstance(sidenavElm).close();
    
                    let page = event.target.getAttribute("href").substr(1);
                    loadPage(page);
                })
            })
        } else {
            throw "Nav tidak dapat ditemukan!";
        }
    }) .catch(error => {
        console.log("Error : "+error)
    })
}

const loadPage = (page) => {
    const contentElm = document.querySelector("#body-content")
    
    fetch(`/pages/${page}.html`)
    .then(response => {
        if (response.status === 404) {
            contentElm.innerHTML = "<h5>Halaman tidak dapat diakses!</h5>";
            throw response.url +" "+response.statusText;
        } else {
            return response.text();
        }
    }) .then(responseText => {
        if (page === "home") {
            getCompetitions();
        } else if (page === "matches"){
            scheduleMatch();
        } else if (page === "favorite"){
            getSavedTeam();
        }

        if (responseText) {
            contentElm.innerHTML = responseText;
        } else {
            contentElm.innerHTML = "<h5>Halaman tidak dapat ditemukan!</h5>";
        }
    }) .catch(error => {
        console.log("Error : "+error);
    })
}