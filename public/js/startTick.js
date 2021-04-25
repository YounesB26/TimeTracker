window.onload = () => {
  let t = new TimeTracker();
  //TODO to activate : t.startEngine();

  //Loading modal template code
  $("#tempoTplContainer").load("templates/tagModal.htm", function () {
    $("#tagModalContent").tmpl();
  });


  /**
   * Modal management :
   * On Show : assign template html to the modal
   * on hide : clear modal to initialize view
   */

  //on show
  $("#tagModal").on("show.bs.modal", function () {
    $("#tagModalContent").tmpl({ timeStamp: [{ title: "Vigie", comment: "anomalies" }, { title: "PDC", comment: "Exercitation nulla eiusmod magna nisi consectetur ex in consequat labore excepteur. In eiusmod consequat non ex. Do consectetur mollit enim nisi magna occaecat quis id aute. Aliquip incididunt aliquip duis sit. Do ad eu amet consequat aute ipsum tempor duis ut et. Adipisicing voluptate eu elit Lorem culpa tempor.Sint anim quis laboris veniam enim sint sit deserunt do laborum fugiat cillum reprehenderit fugiat. Aute velit deserunt qui eu excepteur duis. Laborum id aute sit ullamco officia anim veniam proident officia. Mollit commodo veniam dolore anim sit sunt esse amet enim elit consequat aliquip minim.Nisi magna dolore voluptate pariatur. Exercitation Lorem in eu exercitation. Enim duis nostrud consectetur excepteur ea nostrud nostrud exercitation Lorem eiusmod cillum. Amet proident dolor proident duis cupidatat ea.Non elit ut ea magna ipsum id ad magna. Consequat id minim mollit cillum enim velit commodo eiusmod sunt ipsum sint Lorem commodo. Adipisicing cupidatat sint incididunt reprehenderit ut ipsum in id voluptate aliqua. Laboris aliquip nisi commodo reprehenderit anim." }] })
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

  //on hide
  $("#tagModal").on("hidden.bs.modal", function () {
    $("#modalBody").empty();
  });


};