const pushNotif = (message) => {
	if( Notification.permission === "granted") {
        navigator.serviceWorker.getRegistration()
        .then(reg => {
        	const title = 'League Football';
        	const options = {
				body: message,
				icon: 'assets/icon_192x192.png',
				badge: 'assets/icon_192x192.png',
				vibrate: [100,50,100],
				data: {
				    dateOfArrival: Date.now(),
				    primaryKey: 1
				}
			}

            reg.showNotification(title, options);
        })
    } else {
    	M.toast({html: message})
    }
}

export {pushNotif}