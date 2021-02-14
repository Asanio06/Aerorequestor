var button_open_metar_page= document.getElementById('button_open_metar_page')
button_open_metar_page.addEventListener('click',open_metar_page)
var button_open_welcome_page = document.getElementById('button_open_welcome_page')
button_open_welcome_page.addEventListener('click',open_welcome_page)


function open_metar_page(){
    window.location.href = 'metar_charts.html'

}

function open_welcome_page(){
    window.location.href = 'app.html'
}