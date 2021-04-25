window.onload = () => {
  let t = new TimeTracker();
  //TODO to activate : t.startEngine();

  //Loading modal template code
  $("#tempoTplContainer").load("templates/tagModal.htm", function () {
    $("#tagModalContent").tmpl();
  });


  $("#tagModal").on("hidden.bs.modal", function () {
    $("#modalBody").empty();
  });


  $("#tagModal").on("show.bs.modal", function () {

    $("#tagModalContent").tmpl({ timeStamp: [{ title: "Vigie", comment: "anomalies" }, { title: "PDC", comment: "anomalies PDC" }] })
      .appendTo("#modalBody");

    $("#tagList>a").each((index, elem) => {
      $(elem).on("click", () => {
        $("#tagTitleInput")[0].value = $("#tagTitle_" + index)[0].innerText;
        $("#tagCommentInput")[0].value = $("#tagComment_" + index)[0].innerText;
      });
    });

    $("#list-tab>a").each((...value) => {
      $(value[1]).on("click", (elem) => console.log(elem));
    });
  });



};