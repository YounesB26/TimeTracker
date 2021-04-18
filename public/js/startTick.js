window.onload = () => {
  let t = new TimeTracker();

  $("#btnStart").click(() => {
    t.startEngine();
  })

  $("#list-tab>a").each((...value) => {
    $(value[1]).click((elem) => console.log(elem));
  });


};