const webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BObL1U7K1PUmI2BX3S25LSlIwMubYgMjKbnt9pTHHho9KXlCP1ref1vHqVO-23rYdLvzJknU5qJvx9jathpanOk",
    "privateKey": "Pb6jHriFR6Rh-4LE7SsdDoRkx-4u00VLlDb-YcDKwzs"
}

webPush.setVapidDetails(
    'mailto:muhfar3599@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

const pushSubscription = {
    "endpoint": " https://fcm.googleapis.com/fcm/send/fgBO2VVnhqg:APA91bErTUM5wBNaxT137EvYJbDkmpRZvjp6QIu1wV3H9FWdGofOHedp3GmYT3F7UPzj5_2HLlURAxQBjLKaA_b7ZwXLGzpUFmFv8pS0tGkq6LhHdE-oiP-IVLvrkQF1JocEKBJV1SjF",
    "keys": {
        "p256dh": "BDsGZBbEOlV+Mgq+x/TK/DagY7OFm8xQeffpHhUtUK1EHowupYj4usywenpzXB+W3Y0ZFH0no21K82y3aTpIoT8=",
        "auth": "NwTiLuXTYZoKw9l1lepeIw=="
    }
}

const payload = 'Push Notifikasi berhasil!';

const options = {
    gcmAPIKey: "665437612559",
    TTL: 60
}

pushNotification(payload);

const pushNotification = body => {
    webPush.sendNotification(pushSubscription, body, options);
}