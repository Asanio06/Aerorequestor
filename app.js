var button_valider = document.getElementById('Valider')
button_valider.addEventListener('click',getMetar)
var button_charts = document.getElementById('Charts')
button_charts.addEventListener('click',open_link_of_sia)

$.ajax({
  type: 'GET',
  url: 'http://asanio.alwaysdata.net/index.php?request=airport_list',
  dataType: 'html',
  success: function (result) {
    document.getElementById('content_for_datalist').innerHTML = result
  }
});

$.ajax({
  type: 'GET',
  url: 'http://asanio.alwaysdata.net/index.php?request=Windiest_airport',
  dataType: 'json',
  success: function (result) {
    document.getElementById('windiest_airport_name').innerText = result['name_of_airport']
    document.getElementById('windiest_metar').innerText = result['metar']

  }
});

function getMetar(){

    var airport = document.getElementById('ICAO_airport').value
    airport = airport.toUpperCase()

    $.ajax({
        type: 'GET',
        url: 'http://asanio.alwaysdata.net/index.php?request=metar_of_airport&airport='+airport,
        data: { request: "metar_of_airport", airport: airport },
        dataType: 'json',
        success: function (result) {
          document.getElementById('METAR').innerText = result['metar']
          document.getElementById('advise').innerText = result['advise']
          document.getElementById('advise_content').style.visibility = 'visible'
          get_datalist_ifr_charts_of_airport(airport)
        }
      });

}

function get_datalist_ifr_charts_of_airport(icao_airport){

  $.ajax({
    type: 'GET',
    url: 'http://asanio.alwaysdata.net/index.php?request=list_charts_of_airport&airport='+icao_airport,
    data: { request: "list_charts_of_airport", airport: icao_airport },
    dataType: 'html',
    success: function (result) {
      document.getElementById('content_for_datalist_list_ifr_chart').innerHTML = result
    }
  });


}

function open_link_of_sia(){
    var airport_requested = document.getElementById('ICAO_airport').value
    airport_requested = airport_requested.toUpperCase()
   lien = 'https://www.sia.aviation-civile.gouv.fr/dvd/eAIP_03_DEC_2020/FRANCE/AIRAC-2020-12-03/html/eAIP/FR-AD-2.'+ airport_requested +'-fr-FR.html#AD-2.eAIP.' + airport_requested
   chrome.tabs.create({ url: lien })
}
