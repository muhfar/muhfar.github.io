const dbPromised = idb.open("leagueFootball", 1, (upgradeDb) => {
    const teamObjStore = upgradeDb.createObjectStore("team", {keyPath: "id"});
    teamObjStore.createIndex("id", "id");
})

const saveForLater = team => {
    dbPromised.then(db => {
        const tx = db.transaction("team", "readwrite")
        const store = tx.objectStore("team");
        store.add(team)
        return tx.complete;
    }) .then(() => {
        console.log("Team berhasil disimpan.")
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