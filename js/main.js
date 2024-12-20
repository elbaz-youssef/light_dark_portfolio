// start preloader
const preloader = document.getElementById("preloader");
addEventListener("load", () => preloader.style.cssText = "translate: 200vw");

// make the header fixed at a specific position
const header = document.querySelector('.header');
addEventListener('scroll', () => window.scrollY >= 400? header.style.cssText = "position: fixed !important; box-shadow: rgba(100, 100, 100, 0.19) 0px 1px 5px" : header.style.position = "relative");

// add active class on click on links in the header and change it when reach each section by scroll
const links = document.querySelectorAll('.header-list .list-item');
links.forEach(link => {
    link.addEventListener('click', () => {
        removeActiveFromAll(links);
        link.classList.add('active');
    });
});
const sections = document.querySelectorAll('.section');
addEventListener('scroll', () => {
    sections.forEach(section => {
        let sectionOffsetTop = section.offsetTop - 50;
        let height = section.offsetHeight;
        let scrollFromTop = scrollY;
        if(scrollFromTop > sectionOffsetTop && scrollFromTop <= height + sectionOffsetTop) {
            removeActiveFromAll(links);
            let sectionId = section.getAttribute('id');
            links.forEach(link => {
                console.log(link.children[0].href.slice(link.children[0].href.indexOf("#") + 1));
                link.children[0].href.slice(link.children[0].href.indexOf("#") + 1) === sectionId? link.classList.add('active') : '';
            });
        }
    });
});


// hidden the scroll bottom Icon when reach the services section
const services = document.getElementById('services');
const scrollIcon = document.getElementById('scroll-icon');
const serviceOffsetTop = services.offsetTop;
console.log(serviceOffsetTop);
addEventListener('scroll', () => {
    scrollY <= serviceOffsetTop - 150? scrollIcon.style.cssText = "visibility: visible; opacity: 1" : scrollIcon.style.cssText = "visibility: hidden; opacity: 0";
});

// create smooth effects on hover
const hiddenElms = document.querySelectorAll('.hidden');
let isReachServices = false;
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        entry.isIntersecting? entry.target.classList.add('visible') : '';
    });
});
hiddenElms.forEach(elm => {
    observer.observe(elm);
});

// observe service-item
const serviceItems = document.querySelectorAll('.service-item');
const serviceItemObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});

serviceItems.forEach(serviceItem => {
    serviceItemObserver.observe(serviceItem);
});

// effect for projects item
const projectItems = document.querySelectorAll('.project-item');
let projectObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('toRight');
            console.log('HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH');
        }
    });
});
projectItems.forEach(projectItem => {
    projectObserver.observe(projectItem);
});

// dark mode & light mode
const mode = document.querySelector('.mode');
const darkIcon = document.querySelector('.mode .dark');
const lightIcon = document.querySelector('.mode .light');
const colors = {
    darkThemeColors: {
        "--black": "#fff",
        "--white": "#333",
        "--blue-light": "#333",
        "--white-light": "#333"
    },
    whiteThemeColors: {
        "--black": "#333",
        "--white": "#fff",
        "--blue-light": "#f4f9fb",
        "--white-light": "#f1f1f1"
    }
}
mode.addEventListener('click', () => {
    let blackColor = getComputedStyle(document.documentElement).getPropertyValue("--black");
    blackColor === "#333"? darkWhiteThemes(colors.darkThemeColors,lightIcon,darkIcon) : darkWhiteThemes(colors.whiteThemeColors,darkIcon,lightIcon);
});

// skill observer
let skillCounter = 0;
const skillItems = document.querySelectorAll(".skill-item-bar");
const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            skillItems[skillCounter].classList.contains('scale')? '' : skillItems[skillCounter].classList.add('scale');
            skillCounter = skillCounter === [...skillItems].length - 1? 0 : skillCounter + 1;
        }
    });
});
skillItems.forEach(skillItem => {
    skillObserver.observe(skillItem);
});

// contact change caret color 
const inputs = [...document.querySelectorAll(".contact-form > *:not(.submit)")];
const gray = document.documentElement.style.getPropertyValue("--gray");
for(let input of inputs) {
    input.addEventListener('input', () => {
        input.value !== ''? input.style.caretColor = "#333" : input.style.caretColor = gray;
    });
}

// copyright year 
const copyright = document.getElementById('copyright-year');
copyright.innerHTML = new Date().getFullYear();


// all functions 
function darkWhiteThemes(colorsTheme,appearIcon,disappearIcon) {
    for(let color in colorsTheme) {
        colorsTheme.hasOwnProperty(color)? document.documentElement.style.setProperty(color, colorsTheme[color]) : '';
    }
    appearIcon.style.display = "block";
    disappearIcon.style.display = "none";
}
function removeActiveFromAll(items) {
    items.forEach(item => item.classList.remove('active'));
}


// 134 line of code