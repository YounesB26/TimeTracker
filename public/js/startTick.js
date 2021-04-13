window.onload = () => {

  let t = new TimeTracker();
  console.log(t.name);

  $("#btnStart").click(() => {
    t.start();
  })

};