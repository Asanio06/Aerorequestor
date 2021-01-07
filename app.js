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
    statusCode: {
      204: function() {
        document.getElementById('zone_charts').style.visibility = 'hidden'
      }
    },
    success: function (result) {
      if(result){
        document.getElementById('zone_charts').style.visibility = 'visible'
        document.getElementById('list_ifr_charts').value = ''
        document.getElementById('content_for_datalist_list_ifr_chart').innerHTML = result
      }
  
    }
  });

}

function open_link_of_sia(){
  var name_of_chart = document.getElementById('list_ifr_charts').value
  
  $.ajax({
    type: 'GET',
    url: 'http://asanio.alwaysdata.net/index.php?request=get_url_of_chart&charts='+name_of_chart,
    data: { request: "get_url_of_chart", charts: name_of_chart },
    dataType: 'json',
    success: function (result) {
        chrome.tabs.create({ url: result });
    }
  });

}
