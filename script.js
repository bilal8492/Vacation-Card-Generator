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

  function setRandomImage() {
      
    imgLink.value = images[Math.floor(Math.random() * images.length)];
  }

  document.getElementsByClassName('random-link')[0].addEventListener('click',setRandomImage);

  function clearValues() {
    place.value = "";
    imgLink.value = "";
    comment.value = "";
  }

  function delbtn(e) {
    var card = e.currentTarget.parentElement;
    card.className = "card slide-bottom";
    setTimeout(() => {
      card.remove();
    }, 200);
  }

  var cancelIcon = document
    .getElementsByClassName("cancel-icon")[0]
    .addEventListener("click", delbtn);

  button.addEventListener("click", function () {
    if (
      place.value.length > 0 &&
      imgLink.value.length > 0 &&
      comment.value.length > 0
    ) {
      createCard();
      clearValues();
    }
    function createCard() {
      var div = document.createElement("div");
      div.className = "card";

      var vacationImage = document.createElement("img");
      vacationImage.src = imgLink.value;
      vacationImage.className = "vacImage";
      div.appendChild(vacationImage);

      var icon = document.createElement("img");
      icon.className = "cancel-icon";
      icon.src = "Images/cancel.svg";
      div.appendChild(icon);
      icon.title = "del";
      icon.addEventListener("click", delbtn);

      var heading = document.createElement("h1");
      heading.innerText = place.value;
      div.appendChild(heading);

      var textarea = document.createElement("p");
      textarea.className = "textarea";
      textarea.textContent = comment.value;
      div.appendChild(textarea);

      var element = document.getElementById("card-container");
      element.prepend(div);
    }
  });
});
