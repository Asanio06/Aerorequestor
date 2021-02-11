var button_Request= document.getElementById('Request')
button_Request.addEventListener('click',getMetar)
/*var button_charts = document.getElementById('Charts')
button_charts.addEventListener('click',open_link_of_sia)*/

$.ajax({
    type: 'GET',
    url: 'http://asanio.alwaysdata.net/index.php',
    dataType: 'html',
    data : {request :'airport_list' },
    success: function (result) {
      document.getElementById('content_for_datalist').innerHTML = result
    }
  });


function getMetar(){

    var airport = document.getElementById('ICAO_airport').value
    airport = airport.toUpperCase()

    $.ajax({
        type: 'GET',
        url: 'http://asanio.alwaysdata.net/index.php',
        data: { request: "metar_of_airport", airport: airport },
        dataType: 'json',
        success: function (result) {
          document.getElementById('Metar_display').innerText = result['metar']
          document.getElementById('Airport_Advise').innerText = result['advise']
          /*
          document.getElementById('advise_content').style.visibility = 'visible'
          get_datalist_ifr_charts_of_airport(airport)*/
        }
      });

}

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
        /*document.getElementById('zone_charts').style.visibility = 'visible'
        document.getElementById('list_ifr_charts').value = ''*/
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