
function block() {
    let click = document.getElementById('listLogo')
    click.onclick = function () {
        document.getElementById('listUl').classList.toggle('show');
    };

    document.getElementById('listUl').onclick = function () {
        document.getElementById('listUl').classList.toggle('show')
    }
}

// Sharing Links social media

function shareFacebook(href) {
    window.open(href , 'fbwin' , 'left=20 , top=10 , width=300 , height=600 , resizable=0')
}
function shareTwitter(href) {
    window.open(href , 'fbwin' , 'left=20 , top=10 , width=300 , height=600 , resizable=0')
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
let copyright = document.querySelector('.copyright .end-text p')

let year = new Date()

copyright.innerHTML =` &copy; Copyright ${year.getFullYear()} SYF`