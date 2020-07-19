const publicKey = "BObL1U7K1PUmI2BX3S25LSlIwMubYgMjKbnt9pTHHho9KXlCP1ref1vHqVO-23rYdLvzJknU5qJvx9jathpanOk";
const registerServiceWorker = () => {
    return navigator.serviceWorker.register("/service-worker.js")
    .then(registration => {
        console.log("Service Worker berhasil ditambahkan!");
        return registration;
    }) .catch (err => {
        console.error("Service Worker gagal ditambahkan!", err);
    })
}
const requestPermission = () => {
    if ("Notification" in window) {
        Notification.requestPermission()
        .then(result => {
            if (result === "denied") {
                console.log("Notifikasi ditolak!");
                return;
            } else if (result === "default") {
                console.error("Pengguna menutup dialog permintaan izin");
                return;
            }

            if ("PushManager" in window) {
                navigator.serviceWorker.getRegistration()
                .then(reg => {
                    reg.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: urlBase64ToUint8Array(publicKey)
                    })
                    .then(subscribe => {
                        console.log(subscribe);
                        console.log("Berhasil subscribe dengan endpoint: ", subscribe.endpoint);
                        console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
                            null, new Uint8Array(subscribe.getKey('p256dh')))));
                        console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
                            null, new Uint8Array(subscribe.getKey('auth')))));
                    }) .catch(err => {
                        console.error("Tidak dapat melakukan subscribe: ", err.message);
                    })
                })
                
            }
        })
    } else {
        console.error("Browser tidak mendukung notifikasi");
    }
}
const urlBase64ToUint8Array = base64String => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

if ("serviceWorker" in navigator) {
    registerServiceWorker();
    requestPermission();
} else {
    alert("Service Worker tidak didukung browser ini!");
    console.log("Service Worker tidak didukung browser ini!");
}