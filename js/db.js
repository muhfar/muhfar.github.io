import * as idb from './idb.js';

const dbPromised = idb.open("leagueFootball", 1, (upgradeDb) => {
    const teamObjStore = upgradeDb.createObjectStore("team", {keyPath: "id"});
    teamObjStore.createIndex("id", "id");
})

const saveForLater = team => {
    dbPromised.then(db => {
        const tx = db.transaction("team", "readwrite")
        const store = tx.objectStore("team");
        store.add(team);
        return tx.complete;
    }) .then(() => {
        if( Notification.permission === "granted") {
            navigator.serviceWorker.getRegistration()
            .then(reg => {
                reg.showNotification("League Football", {'body':`${team.name} berhasil disimpan.`})
            })
        }
        console.log("Team berhasil disimpan.")
    })
}

const deleteSaveItem = team => {
    dbPromised.then(db => {
        const tx = db.transaction("team", "readwrite").objectStore("team");
        tx.delete(parseInt(team.id));
        return tx.complete;
    }) .then(() => {
        if( Notification.permission === "granted") {
            navigator.serviceWorker.getRegistration()
            .then(reg => {
                reg.showNotification("League Football", {'body':`${team.name} berhasil dihapus.`})
            })
        }
        console.log("Team berhasil dihapus.")
    })
}

const getSavedTeamDb = () => {
    return new Promise((resolve, reject) => {
        dbPromised.then(db => {
            const tx = db.transaction("team", "readonly").objectStore("team");
            return tx.getAll();
        })
        .then(teams => {
            resolve(teams);
        })
    })
}

const getSavedTeamIdDb = (id) => {
    return new Promise((resolve, reject) => {
        dbPromised
        .then(db => {
            const tx = db.transaction("team", "readonly").objectStore("team");
            return tx.get(parseInt(id));
        })
        .then(team => {
            resolve(team);
        })
    })
}

export {getSavedTeamDb, getSavedTeamIdDb, saveForLater, deleteSaveItem};