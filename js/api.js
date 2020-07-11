import {getSavedTeamDb, getSavedTeamIdDb} from './db.js';

const base_url = "https://api.football-data.org/v2/";
const API_KEY = "ab3d341ff5de4bdc82f3527f700a8b2a";
const id_liga = [
    2000, //Fifa World Cup
    2001, //UEFA Uerope
    2002, //Bundesliga
    2021, //PL England
];

const formatTanggal = tanggal => {
    let date = new Date(tanggal);
    date = date.toLocaleDateString().split("/").join("-");
    return date;
}

const status = response => {
    if (response.status !== 200) {
        return Promise.reject(new Error(response.status))
    } else {
        return Promise.resolve(response);
    }
}

const json = response => {
    return response.json();
}
const showOfflineMessage = () => {
    let offlineElm = `<div id="error-page">
    <h5>Oops, Anda sedang offline dan konten yang diminta belum tersimpan pada cache.</h5>
    <p>Pastikan koneksi anda terhubung.</p>
    </div`;
    document.querySelector("#body-content").innerHTML = offlineElm;
}
const showErrorMessage = error => {
    console.log(error);
}
//Content Competitions
const loadCompetition = responseJSON => {
    console.log(responseJSON.competitions);
    let contentElm = "";
    responseJSON.competitions.forEach(competition => {
        if (id_liga.indexOf(competition.id) !== -1) {
            contentElm += `
                <div class="col s12 m6">
                    <div class="card center">
                        <a href="./standing.html?id=${competition.id}">
                            <div class="card-image waves-effect waves-block waves-light">
                                <img src="assets/${competition.name}.svg" alt="${competition.name}"/>
                            </div>
                        </a>
                        <div class="card-content">
                            <p class="card-title">${competition.name}</p>
                            <p>${competition.area.name}</p>
                        </div>
                    </div>
                </div>
            `;
        }
    })
    document.querySelector("#competitions").innerHTML = contentElm;
}
//Endpoint All Competitions
const getCompetitions = () => {
    let dataInCache = false;
    if ("caches" in window) {
        caches.match(base_url+"competitions/?plan=TIER_ONE")
        .then(response => {
            if (response) {
                dataInCache = true;
                json(response)
                .then(loadCompetition)
            }
        })
    }

    fetch(base_url+"competitions/?plan=TIER_ONE", {
        method: 'GET',
        headers: {"X-Auth-Token": API_KEY}
    }) 
    .then(status)
    .then(json)
    .then(loadCompetition)
    .catch(error => {
        if (!navigator.online && !dataInCache) {
            showOfflineMessage()
        }
        showErrorMessage(error);
    })
}
//Endpoint Standing Competition
const getStandings = () => {
    let dataInCache = false;
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id");

    if ("caches" in window){
        caches.match(base_url+"competitions/"+idParam+"/standings")
        .then(response => {
            if (response) {
                dataInCache = true;
                json(response)
                .then(contentStanding)
            }
        })
    }

    fetch(base_url+"competitions/"+idParam+"/standings", {
        method: 'GET',
        headers: {"X-Auth-Token": API_KEY}
    }) 
    .then(status)
    .then(json)
    .then(contentStanding)
    .catch(error => {
        if (!navigator.online && !dataInCache) {
            showOfflineMessage()
        }
        showErrorMessage(error);
    })
}
//Endpoint Schedule Match
const scheduleMatch = () => {
    let dataInCache = false;
    if ("caches" in window){
        caches.match(base_url+"matches/?competitions="+id_liga)
        .then(response => {
            if (response) {
                dataInCache = true;
                json(response)
                .then(contentSchedule)
            }
        })
    }

    fetch(base_url+"matches/?competitions="+id_liga, {
        method: 'GET',
        headers: {"X-Auth-Token": API_KEY}
    }) 
    .then(status)
    .then(json)
    .then(contentSchedule)
    .catch(error => {
        if (!navigator.online && !dataInCache) {
            showOfflineMessage()
        }
        showErrorMessage(error);
    })
}
//Content Standing
const contentStanding = responseJSON => {
    console.log(responseJSON);
    document.querySelector("#body-content").innerHTML += `
        <div id="title-page">
            <h4>Klasemen ${responseJSON.competition.name}</h4><hr>
        </div>
    `;

    document.querySelector("#body-content").innerHTML = `
        <div id="info-liga">
            <div class="container">
                <div class="row">
                    <div class="col s12 m6 waves-effect waves-block waves-light">
                        <img src="assets/${responseJSON.competition.name}.svg" alt="${responseJSON.competition.name}" class="img-logo"/>
                    </div>
                    <div class="col s12 m6">
                        <p>Tanggal dimulai: ${formatTanggal(responseJSON.season.startDate)}</p>
                        <p>Tanggal berakhir: ${formatTanggal(responseJSON.season.endDate)}</p>
                        <p>Pertandingan Hari: ${responseJSON.season.currentMatchday}</p>
                        <p>Pemenang: ${responseJSON.season.winner ? `${responseJSON.season.winner.name}` : "-"}</p>
                    </div>
                </div>
            </div>
        </div>
        <div id="table-standing"></div>
    `;

    let groupElm = "";
    responseJSON.standings.forEach(group => {
        if (group.type === "TOTAL"){
            groupElm += `
                <div>
                    ${group.group ? `<h5 class="group-name red darken-1 white-text">${group.group.replace(/_/g, " ")}</h5>` : ""}
                    <table class="responsive-table highlight center">
                        <thead class="red-text text-darken-3">
                            <tr>
                                <th>Posisi</th>
                                <th>Team</th>
                                <th>M/S/K</th>
                                <th>Poin</th>
                                <th>Cetak Gol</th>
                                <th>Kebobolan</th>
                                <th>Detail</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${group.table.map((item, i) => `
                                <tr>
                                    <td>${item.position}</td>
                                    <td>${item.team.name}</td>
                                    <td>${item.won}/${item.draw}/${item.lost}</td>
                                    <td>${item.points}</td>
                                    <td>${item.goalsFor}</td>
                                    <td>${item.goalsAgainst}</td>
                                    <td>
                                        <a class="waves-effect waves-red btn-small btn-flat red darken-2 white-text" href="./team.html?id=${item.team.id}">Detail<i class="material-icons right">keyboard_arrow_right</i></a>
                                    </td>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;
        }        
    })
    document.querySelector("#table-standing").innerHTML = groupElm;
}
const contentInfoLiga = (responseJSON, id_liga) => {
    let contentElm = "";
    
    for (let match of responseJSON.matches) {
        if (id_liga === match.competition.id) {
            contentElm += `
                <div id="info-liga">
                    <div class="container">
                        <div class="row">
                            <div class="col s12 m6 waves-effect waves-block waves-light ">
                                <img src="/assets/${match.competition.name}.svg" alt="${match.competition.name}" class="img-logo"/>
                            </div>
                            <div class="col s12 m6">
                                <p>Tanggal dimulai: ${formatTanggal(match.season.startDate)}</p>
                                <p>Tanggal berakhir: ${formatTanggal(match.season.endDate)}</p>
                                <p>Pertandingan Hari: ${match.season.currentMatchday}</p>
                                <p>Pemenang: ${match.season.winner ? `${match.season.winner.name}` : "-"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            return contentElm;
            break;
        }
    }
}
const contentMatch = (responseJSON, id_liga) => {
    let contentElm = "<div class='center' id='table-match'>";
    responseJSON.matches.forEach(match => {
        if (match.competition.id === id_liga) {
            let dateMatch = new Date(match.utcDate);
            contentElm += `
            <div class="row">
                <div class="col s4 homeTeam">
                    <h5>${match.homeTeam.name}</h5>
                    <h4>${match.score.fullTime.homeTeam ? match.score.fullTime.homeTeam : "0"}</h4>
                </div>
                <div class="col s4 scoreBoard">
                    <p>${formatTanggal(dateMatch)}<br>
                    ${dateMatch.toLocaleTimeString("id", {hour:'2-digit',minute:'2-digit'})}</p>
                    <h4>VS</h4>
                </div>
                <div class="col s4 awayTeam">
                    <h5>${match.awayTeam.name}</h5>
                    <h4>${match.score.fullTime.awayTeam ? match.score.fullTime.awayTeam : 0}</h4>
                </div>
            </div>
            `;
        }
    })
    contentElm += "</div>"; //Close Statement
    return contentElm;
}
const contentSchedule = responseJSON => {
    let contentLiga = "";
    let contentElm = "";
    console.log(responseJSON);
    id_liga.forEach(liga_id => {
        contentLiga = contentInfoLiga(responseJSON, liga_id);
        if (contentLiga){
            contentElm += contentLiga;
            contentElm += contentMatch(responseJSON, liga_id);
        }
    })
    document.querySelector("#matches").innerHTML = contentElm;
}
//Endpoint Get Team by ID
const getTeam = () => {
    return new Promise((resolve, reject) => {
        let dataInCache = false;
        const urlParams = new URLSearchParams(window.location.search);
        const idParam = urlParams.get("id");

        if ("caches" in window){
            caches.match(base_url+"teams/"+idParam)
            .then(response => {
                if (response) {
                    json(response)
                    .then(responseJSON => {
                        contentTeam(responseJSON)
                        resolve(responseJSON)
                    })
                    dataInCache = true;
                }
            })
        }

        fetch(base_url+"teams/"+idParam, {
            method: 'GET',
            headers: {"X-Auth-Token": API_KEY}
        }) 
        .then(status)
        .then(json)
        .then(responseJSON => {
            contentTeam(responseJSON)
            resolve(responseJSON)
        })
        .catch(error => {
            if (!navigator.online && !dataInCache) {
                showOfflineMessage();
                document.querySelector("#save").style.display = "none";
            }
            showErrorMessage(error);
        })
    })
    
}
//Endpoint Get Saved Team
const getSavedTeam = () => {
    getSavedTeamDb()
    .then(teams => {
        console.log(teams);
        //Title Page
        let titleElm = `
            <div id="title-page">
                <h4>Team Favorite</h4>
                <hr>
            </div>
            <div class="row"></div>
        `;
        document.querySelector("#fav-team").innerHTML = titleElm;
        //Teams
        let contentElm = "";
        teams.forEach(team => {
            contentElm += `
            <div class="col s6 m3">
                <div class="card">
                    <a href="./team.html?id=${team.id}&saved=true" >
                        <div class="card-image waves-effect waves-block waves-light">
                            <img src="${team.crestUrl}" alt="${team.name}" />
                        </div>
                    </a>
                    <div class="card-content">
                        <span class="card-title">${team.shortName}</span>
                    </div>
                </div>
            </div>
            `;
        })
        document.querySelector("#fav-team .row").innerHTML = contentElm;
    })
}
//Endpoint Get Saved Team By ID
const getSavedTeamId = (id) => {
    getSavedTeamIdDb(id)
    .then(contentTeam)
}
const contentTeam = responseJSON => {
    console.log(responseJSON)
    //Title Page
    document.querySelector("#body-content").innerHTML = `
    <div id="title-page">
        <h4>Team ${responseJSON.name}<hr></h4>
    </div>`;

    //Body
    let contentElm = "";
    contentElm = `
        <div id="info-team">
            <div class="row">
                <div class="col s12 m6 center">
                    <img src="${responseJSON.crestUrl}" alt="${responseJSON.name}" class="img-logo"/>
                </div>
                <div class="col s12 m6">
                    <h5>${responseJSON.name}</h5>
                    <p>${responseJSON.founded}, ${responseJSON.area.name}</p>
                    <p>Stadium: ${responseJSON.venue}</p>
                    <p>Email: ${responseJSON.email ? responseJSON.email : "-"}</p>
                    <p>Phone: ${responseJSON.phone ? responseJSON.phone : "-"}</p>
                    <a href="${responseJSON.website}" target="_blank" class="btn-small waves-effect waves-light red darken-2 white-text">Visit Website</a>
                </div>
            </div>
        </div>
    `;

    document.querySelector("#body-content").innerHTML += contentElm;
}

export {getCompetitions, getStandings, scheduleMatch, getSavedTeam, getSavedTeamId, getTeam};