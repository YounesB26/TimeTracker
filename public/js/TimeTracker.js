class TimeTracker {
  constructor() {
    this.name = "TimeTracker";
    this.registredNotification;
  }

  /**
  * Init and register Notification
   */
  _initNotification() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('js/sw.js')
        .then(function (registration) {
          this.registredNotification = registration;
          registration.addEventListener('updatefound', function () {
            // If updatefound is fired, it means that there's a new service worker being installed.
            var installingWorker = registration.installing;
            console.log('A new service worker is being installed:', installingWorker);
            // You can listen for changes to the installing service worker's state via installingWorker.onstatechange
          });
          registration.showNotification("notify");
        })
        .catch(function (error) {
          console.log('Service worker registration failed:', error);
        });
    } else {
      console.log('Service workers are not supported.');
    }
  }

  _initTicking() {
    console.log("Start Ticking !");

    this._initNotification();

    if (!this.registredNotification) {
      console.warn("Notification can not be shown, make sure notifications are allowed by the browser")
    }


    $.getJSON("data/userSetting.json", (res) => {
      let userSettings = res;

      let tick = localStorage.getItem('Tick') || 0;
      sessionStorage.setItem('Tick', tick);

      setInterval(() => {
        tick++;
        sessionStorage.setItem('Tick', tick);
        localStorage.setItem('Tick', tick);
      }, userSettings.userNotificationInterval || TT.app.defaultNotificationInterval);

      window.onunload = () => {
        localStorage.clear();
      };
    });
  }

  start() {
    this._initTicking();
  }

}