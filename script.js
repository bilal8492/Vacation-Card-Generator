document.addEventListener("DOMContentLoaded", (event) => {
  var place = document.getElementById("place");
  var button = document.getElementById("btn");
  var imgLink = document.getElementById("link");
  var comment = document.getElementById("comment");
  var cardContainer = document.getElementsByClassName("card-container");
  button.addEventListener("click", function () {
    if (
      place.value.length > 0 &&
      imgLink.value.length > 0 &&
      comment.value.length > 0
    ) {
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
      icon.title='del'
      icon.addEventListener('click', delbtn );

      var heading = document.createElement("h1");
      heading.innerText = place.value;
      div.appendChild(heading);

      var textarea = document.createElement("p");
      textarea.className="textarea";
      textarea.textContent = comment.value;
      div.appendChild(textarea);

      var element = document.getElementById("card-container");
      element.prepend(div);

      
    }
    function delbtn() {
        div.className = "card slide-bottom";
        setTimeout(() => { 
            div.remove();
        }, 200);
        
    }
  });
});
