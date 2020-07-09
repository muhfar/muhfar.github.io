if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/service-worker.js")
        .then(() => {
            console.log("Service Worker berhasil ditambahkan!");
        }) .catch (() => {
            console.log("Service Worker gagal ditambahkan!");
        })
    })
} else {
    alert("Service Worker tidak didukung browser ini!");
    console.log("Service Worker tidak didukung browser ini!");
}