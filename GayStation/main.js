
function  onNavbarElementsClick() {
    let navbarElementsText = document.getElementsByClassName("navbar-element-text");
    for (let i = 0; i < navbarElementsText.length; i++) {
        let navbarElement = navbarElementsText.item(i);
        navbarElement.onclick = function (){
           let currentNavbarElement = document.querySelector(".navbar-element-text-current");
           let buffer = currentNavbarElement.textContent;
           currentNavbarElement.textContent  = navbarElement.textContent;
           navbarElement.textContent = buffer;
        }
    }
}
onNavbarElementsClick();
function onClassClick(elements, event, reaction){
    for (let i = 0; i < elements.length; i ++){
        let element = elements.item(i);
        element.addEventListener(event, reaction);
    }
}
