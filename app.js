var button_valider = document.getElementById('Valider')
button_valider.addEventListener('click',getMetar)
var button_charts = document.getElementById('Charts')
button_charts.addEventListener('click',open_link_of_sia)

function getMetar(){

    var airport = document.getElementById('ICAO_airport').value

    $.ajax({
        type: 'GET',
        url: 'https://api.checkwx.com/metar/'+airport,
        headers: { 'X-API-Key': 'ed3c7cbc98f94a2a852bbacfb6' },
        dataType: 'json',
        success: function (result) {
          document.getElementById('METAR').innerText = result['data']
        }
      });

}

function open_link_of_sia(){
    var airport_requested = document.getElementById('ICAO_airport').value
   lien = 'https://www.sia.aviation-civile.gouv.fr/dvd/eAIP_03_DEC_2020/FRANCE/AIRAC-2020-12-03/html/eAIP/FR-AD-2.'+ airport_requested +'-fr-FR.html#AD-2.eAIP.' + airport_requested
   chrome.tabs.create({ url: lien })
}