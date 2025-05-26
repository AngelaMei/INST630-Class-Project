const changeButton = document.querySelector("button.hungry");

function changeButtonColor(){
  console.log("changeButtonColor");
  const titlecolor = document.querySelector(".title");
  titlecolor.classList.toggle("newcolor");
}

changeButton.addEventListener("click", () => changeButtonColor());