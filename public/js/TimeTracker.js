class TimeTracker {
  constructor() {
    this.name = "TimeTracker";//TODO : should be dynamic?
    this.registredNotification;
    this.tick = 0;
    this.defaultConfiguration = {
      notificationInterval: 30 * 60 * 1000
    };
  }

  /**
  * Init and register Notification
   */
  _initNotification(callback) {
    var that = this;
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('js/sw.js')
        .then(function (registration) {
          that.registredNotification = registration;
          registration.addEventListener('updatefound', function () {
            // If updatefound is fired, it means that there's a new service worker being installed.
            var installingWorker = registration.installing;
            console.log('A new service worker is being installed:', installingWorker);
            // You can listen for changes to the installing service worker's state via installingWorker.onstatechange
          });
          console.log("Notifications are ready!");

          registration.showNotification("notify");
          callback();
        })
        .catch(function (error) {
          console.log('Service worker registration failed:', error);
        });
    } else {
      console.log('Service workers are not supported.');
      console.warn("Notification can not be shown, make sure notifications are allowed by the browser");
    }
  }

  startEngine() {
    var that = this;
    console.log("Booting!");

    this._initNotification(function () {
      console.log("Start Ticking!");

      $.getJSON("data/userSetting.json", (res) => {
        let userSettings = res;

        that.tick = localStorage.getItem('Tick') || 0;
        sessionStorage.setItem('Tick', that.tick);

        setInterval(() => {
          that.tick++;
          sessionStorage.setItem('Tick', that.tick);
          localStorage.setItem('Tick', that.tick);
        }, userSettings.userNotificationInterval || that.defaultConfiguration.notificationInterval);

        window.onunload = () => {
          localStorage.clear();
        };
      });
    });

  }

}