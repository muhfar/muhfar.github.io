import * as idb from './idb.js';
import {pushNotif} from './api.js';

const dbPromised = idb.open("leagueFootball", 1, (upgradeDb) => {
    const teamObjStore = upgradeDb.createObjectStore("team", {keyPath: "id"});
    teamObjStore.createIndex("id", "id");
})

const saveForLater = team => {
    dbPromised.then(db => {
        const tx = db.transaction("team", "readwrite")
        const store = tx.objectStore("team");
        store.put(team);
        return tx.complete;
    }) .then(() => {
        pushNotif(`${team.name} berhasil disimpan.`);
        console.log("Team berhasil disimpan.")
    }) .catch(error => {
        console.error("IDB Put error: ", error)
    })
}

const deleteSaveItem = team => {
    dbPromised.then(db => {
        const tx = db.transaction("team", "readwrite").objectStore("team");
        tx.delete(parseInt(team.id));
        return tx.complete;
    }) .then(() => {
        pushNotif(`${team.name} berhasil dihapus.`)
        console.log("Team berhasil dihapus.")
    }) .catch(error => {
        console.error("IDB Delete error: ", error)
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