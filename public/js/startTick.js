window.onload = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('js/sw.js')
      .then(function (registration) {
        registration.addEventListener('updatefound', function () {
          // If updatefound is fired, it means that there's
          // a new service worker being installed.
          var installingWorker = registration.installing;
          console.log('A new service worker is being installed:',
            installingWorker);
          // You can listen for changes to the installing service worker's
          // state via installingWorker.onstatechange
        });
  
        registration.showNotification("notify");
      })
      .catch(function (error) {
        console.log('Service worker registration failed:', error);
      });
  } else {
    console.log('Service workers are not supported.');
  }

  
  $.getJSON("data/userSetting.json", (res) => {
    let userSettings = res;

    let tick = localStorage.getItem('Tick') || 0;
    sessionStorage.setItem('Tick', tick);

    setInterval(() => {
      tick++;
      sessionStorage.setItem('Tick', tick);
      localStorage.setItem('Tick', tick);
      //console.log("Tick = " + sessionStorage.getItem('Tick'));
    }, userSettings.userNotificationInterval || TT.app.defaultNotificationInterval);

    window.onunload = () => {
      //localStorage.setItem('Tick', sessionStorage.getItem("Tick"));
      localStorage.clear();
    };
  })
};


var showNotification = function showNotification() {
  console.log(Notification.permission);
  if (Notification.permission === "granted") {
    alert("we have permission");
    notification = new Notification("Tag Time", {
      body: "It's time to Tag what have you done !",
      icon: "icons/TimeTracker_180x180.png",
      requireInteraction: true,
      actions: [
        {
          action: 'archive',
          title: 'Archive'
        }
      ]
    });

    self.addEventListener('notificationclick', function (event) {
      event.notification.close();
      if (event.action === 'archive') {
        // Archive action was clicked
        archiveEmail();
      } else {
        // Main body of notification was clicked
        clients.openWindow('/inbox');
      }
    }, false);

  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(permission => {
      console.log(permission);
    });
  }
};
