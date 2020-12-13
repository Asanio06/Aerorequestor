var button_valider = document.getElementById('Valider')
button_valider.addEventListener('click',getMetar)
var button_charts = document.getElementById('Charts')
button_charts.addEventListener('click',open_link_of_sia)

function getMetar(){

    var airport = document.getElementById('ICAO_airport').value

    $.ajax({
        type: 'GET',
        url: 'http://asanio.alwaysdata.net/index.php?request=metar_of_airport&airport='+airport,
        data: { request: "metar_of_airport", airport: airport },
        dataType: 'json',
        success: function (result) {
          document.getElementById('METAR').innerText = result
        }
      });

}

function open_link_of_sia(){
    var airport_requested = document.getElementById('ICAO_airport').value
   lien = 'https://www.sia.aviation-civile.gouv.fr/dvd/eAIP_03_DEC_2020/FRANCE/AIRAC-2020-12-03/html/eAIP/FR-AD-2.'+ airport_requested +'-fr-FR.html#AD-2.eAIP.' + airport_requested
   chrome.tabs.create({ url: lien })
}