const hamburger_icon = document.querySelector('nav li#diy-hamburger-icon');
const topnav = document.querySelector('#topnav');

let menu_enabled = false;
hamburger_icon.addEventListener("click", 
    () => {
        if (menu_enabled == true) {
            menu_enabled = false;
            topnav.className = "";
        }
        else {
            menu_enabled = true;
            topnav.className = "responsive";
        }
        console.log(`Click event, menu_enabled=${menu_enabled}`);
    }
);