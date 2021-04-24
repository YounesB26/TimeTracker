window.onload = () => {
  let t = new TimeTracker();
  t.startEngine();

  $("#tempoTplContainer").load("templates/greetings.htm", function () {
    $("#simpleHello").tmpl({ timeStamp: [{ title: "Vigie", comment: "anomalies" },{ title: "PDC", comment: "anomalies PDC" }] })
      .appendTo("#modalBody");

    $("#list-tab>a").each((...value) => {
      $(value[1]).click((elem) => console.log(elem));
    });
  });



};