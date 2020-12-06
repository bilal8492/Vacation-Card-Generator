document.addEventListener("DOMContentLoaded", (event) => {
  var place = document.getElementById("place");
  var button = document.getElementById("btn");
  var imgLink = document.getElementById("link");
  var comment = document.getElementById("comment");
  var cardContainer = document.getElementsByClassName("card-container");
  var images = [
    "https://images.unsplash.com/photo-1594056929750-0ec33d317d42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    "https://images.unsplash.com/photo-1593344352545-ffb4a9512528?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80",
    "https://images.unsplash.com/photo-1593434820349-0ca11844c957?ixlib=rb-1.2.1&auto=format&fit=crop&w=1189&q=80",
    "https://images.unsplash.com/photo-1593053138039-c8cdd703700e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
    "https://images.unsplash.com/photo-1564853970185-a8ff943c61e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
  ];

  function getAllCard() {
    fetch("http://localhost:3000/getall")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        data.forEach((card) => {
          var div = document.createElement("div");
          div.className = "card";
          div.id= card._id;

          var vacationImage = document.createElement("img");
          vacationImage.src = card.imgLink;
          vacationImage.className = "vacImage";
          div.appendChild(vacationImage);

          var icon = document.createElement("img");
          icon.className = "cancel-icon";
          icon.src = "Images/cancel.svg";
          div.appendChild(icon);
          icon.title = "del";
          icon.addEventListener("click", delbtn);

          var heading = document.createElement("h1");
          heading.innerText = card.place;
          div.appendChild(heading);

          var textarea = document.createElement("p");
          textarea.className = "textarea";
          textarea.textContent = card.comment;
          div.appendChild(textarea);

          var element = document.getElementById("card-container");
          element.prepend(div);
        });
      });
  }

  getAllCard();

  function setRandomImage() {
    imgLink.value = images[Math.floor(Math.random() * images.length)];
  }

  document
    .getElementsByClassName("random-link")[0]
    .addEventListener("click", setRandomImage);

  function clearValues() {
    place.value = "";
    imgLink.value = "";
    comment.value = "";
  }

  function delbtn(e) {
    var id = e.currentTarget.parentElement.id;
    fetch("http://localhost:3000/Card/"+id, {
      method: "delete",
    }).then(function (response) {
      console.log(response.status);
      cardContainer[0].innerHTML = "";
      getAllCard();
      
    });
  
  }

  button.addEventListener("click", function () {
    if (
      place.value.length > 0 &&
      imgLink.value.length > 0 &&
      comment.value.length > 0
    ) {
      var Card = {
        place: place.value,
        imgLink: imgLink.value,
        comment: comment.value,
      };

      fetch("http://localhost:3000/Card", {
        method: "post",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(Card),
      }).then(function (response) {
        cardContainer[0].innerHTML = "";
        getAllCard();
        clearValues();
        console.log(response.status);
      });
    }
  });
});


