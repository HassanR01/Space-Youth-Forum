
function blurL() {
    let blur = document.getElementById('landing');
    blur.classList.toggle('alert');

    let show = document.getElementById('alert');
    show.style.display= 'flex';
}

function closeL() {
    let close = document.getElementById('landing');
    close.classList.remove('alert');

    let hide = document.getElementById('alert');
    hide.style.display= 'none';
}

// +++++++++++++ for List Nav +++++++++++++++++

function block() {
    let click = document.getElementById('listLogo')
    click.onclick = function () {
        document.getElementById('listUl').classList.toggle('show');
        click.classList.toggle('i')
    };

    document.getElementById('listUl').onclick = function () {
        document.getElementById('listUl').classList.toggle('show')
    }
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++

let head = document.getElementById('head')

window.addEventListener('scroll' , function () {
    head.classList.toggle('change' , window.scrollY > 0)
})


// ++++++++++++++++++++ Loading Page ++++++++++++++++++++++++
window.onload = () => {
    let LoadingPage = document.querySelector('#loadingPage')

    LoadingPage.style.opacity = '1'
    LoadingPage.style.display = 'flex' 
    document.body.style.overflow = 'hidden'

    setTimeout(() => {
        document.body.style.overflow = 'auto'
        LoadingPage.style.opacity = '0'        
    }, 3000);

    setTimeout(() => {
        LoadingPage.style.display = 'none'
    }, 4000);

}
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
let copyright = document.querySelector('.copyright .end-text p')

let year = new Date()

copyright.innerHTML =` &copy; Copyright ${year.getFullYear()} SYF`


