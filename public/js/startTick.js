window.onload = () => {

  let t = new TimeTracker();

  $("#btnStart").click(() => {
    t.startEngine();
  })

};