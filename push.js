const webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BPiOrpFsmjYWD_L3B_iQHnK181oczFyX4XQGU3-BxfQdTnLKlo0y3xuDjYyWAu7FgbosepdqneHnesGDjgl-618",
    "privateKey": "o_uRgIXd-ATjmopZTbAV1m99SZ6qGQZ3mVU_uzK9Itc"
}

webPush.setVapidDetails(
    'mailto:muhfar3599@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

const pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/efBbZrD3tHY:APA91bHNVn74zHS4Tqim-5CaDGc-jKzKa-cX0YUOFQhQaOzVkc18rsIuvAxFmL-52FkGK4po8zO2ofzFS4RYbFRtTwqxC0OkZ2LaiK8KOqQyKY_U-2IcF3tB0UwMUwL5mrODHzw27u7e",
    "keys": {
        "p256dh": "BLnDghGxrHkM3IGTW1MnRje3QQJhVZZpGu/RDbTZ+UZGwczhMReytOdNg/ev5BOfLkl0RKs7B+fxl+d5yK4PD40=",
        "auth": "EMaZz9D8Ei8Lp72XiRdutA=="
    }
}

const options = {
    gcmAPIKey: "665437612559",
    TTL: 60
}

const pushNotification = body => {
    webPush.sendNotification(pushSubscription, body, options)
    .catch(error => {
        console.error(error)
    })
}

const payload = 'Push Notifikasi berhasil!';

pushNotification(payload);