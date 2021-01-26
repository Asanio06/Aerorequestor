var button_valider = document.getElementById('Valider')
button_valider.addEventListener('click',getMetar)
var button_charts = document.getElementById('Charts')
button_charts.addEventListener('click',open_link_of_sia)

$.ajax({
  type: 'GET',
  url: 'http://asanio.alwaysdata.net/index.php',
  dataType: 'html',
  data : {request :'airport_list' },
  success: function (result) {
    document.getElementById('content_for_datalist').innerHTML = result
  }
});

$.ajax({
  type: 'GET',
  url: 'http://asanio.alwaysdata.net/index.php',
  dataType: 'json',
  data : {request :'Windiest_airport' },
  success: function (result) {
    document.getElementById('windiest_airport_name').innerText = result['name_of_airport'] + '(' + result['name_of_countrie'] + ')'
    document.getElementById('windiest_metar').innerText = result['metar']

  }
});



function get_datalist_ifr_charts_of_airport(icao_airport){

  $.ajax({
    type: 'GET',
    url: 'http://asanio.alwaysdata.net/index.php',
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
    url: 'http://asanio.alwaysdata.net/index.php',
    data: { request: "get_url_of_chart", charts: name_of_chart },
    dataType: 'json',
    success: function (result) {
        chrome.tabs.create({ url: result });
    }
  });

}
