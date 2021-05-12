const urlApi = 'http://localhost:8000/api';

var button_Request= document.getElementById('Request')
button_Request.addEventListener('click',getMetar)
var button_charts = document.getElementById('Open_charts')
button_charts.addEventListener('click',open_link_of_sia)
var link_vfr_charts = document.getElementById('lien_chart_vfr')
link_vfr_charts.addEventListener('click',open_vfr_chart)

$.ajax({
    type: 'GET',
    url: `${urlApi}/airport/`,
    dataType: 'json',
    success: function (result) {
        const listAirport = result.allAirport;
        console.log(listAirport[0])
        var options = '';

        listAirport.forEach((airport)=>{
            options += `<option value="${airport.ident}"> ${airport.name} </option>`;

        })
      document.getElementById('list_airport').innerHTML = options;
    }
  });


function getMetar(){

    var airportICAO = document.getElementById('ICAO_airport').value
    airportICAO = airportICAO.toUpperCase()

    $.ajax({
        type: 'GET',
        url: `${urlApi}/weather/metar/${airportICAO}`,
        dataType: 'json',
        success: function (result) {
          document.getElementById('zone_display_metar').style.visibility = 'visible';
          console.log(result)
          document.getElementById('Metar_display').innerText = result.weatherData.raw_text;
            const flightCategory = result.weatherData.flight_category;
            let advise;
            if(flightCategory){

                if(flightCategory == 'VFR'){
                    advise = "You can do all type of flight" ;

                }else if(flightCategory == 'MVFR'){
                    advise = "You can do special vfr and IFR";
                }else{
                    advise = "You can also do IFR flight";
                }

            }else{
                advise = 'No advise for this airport';
            }
          document.getElementById('Airport_Advise').innerText = advise;
          
          document.getElementById('Airport_Advise').style.visibility = 'visible';
          get_datalist_ifr_charts_of_airport(airportICAO)
          //get_vfr_link_of_chart(airportICAO)
        }
      });

}

function get_datalist_ifr_charts_of_airport(icao_airport){

  $.ajax({
    type: 'GET',
    url: `${urlApi}/chart/airport/${icao_airport}`,
    dataType: 'json',
    statusCode: {
      400: function() {
        document.getElementById('zone_ifr_charts').style.visibility = 'hidden';
      }
    },
    success: function (result) {
      if(result){
        document.getElementById('zone_ifr_charts').style.visibility = 'visible';
        //document.getElementById('list_ifr_charts').value = ''
          const listChart = result.listCarteAerport;
          console.log(result)

          var options = '';

          listChart.forEach((chart)=>{
              options += `<option id="${chart.url}" value="${chart.Chart_name} "> </option>`;

          })
        document.getElementById('list_ifr_chart').innerHTML = options;
      }
  
    }
  });

}

function get_vfr_link_of_chart(icao_airport){


  $.ajax({
    type: 'GET',
    url: 'http://asanio.alwaysdata.net/index.php',
    data: { request: "get_url_of_vfr_chart", airport: icao_airport },
    dataType: 'json',
    statusCode: {
      204: function() {
        document.getElementById('zone_vfr_charts').style.visibility = 'hidden'
      }
    },
    success: function (result) {
      if(result){

        document.getElementById('zone_vfr_charts').style.visibility = 'visible'
        lien = result
        document.getElementById('lien_chart_vfr').innerHTML = '<a href="'+ lien +' target="_blank"">LIEN</a>'
        
      }
  
    }
  });

}

function open_vfr_chart(){
  var airport = document.getElementById('ICAO_airport').value
  airport = airport.toUpperCase()

  $.ajax({
    type: 'GET',
    url: 'http://asanio.alwaysdata.net/index.php',
    data: { request: "get_url_of_vfr_chart", airport: airport },
    dataType: 'json',
    statusCode: {
      204: function() {
        document.getElementById('zone_vfr_charts').style.visibility = 'hidden'
      }
    },
    success: function (result) {
      if(result){

        chrome.tabs.create({ url: result });
        
      }
  
    }
  });

}

function open_link_of_sia(){

    var name_of_chart = document.getElementById('chart_selected').value
    console.log(name_of_chart)
    const url = $('#list_ifr_chart').find('option[value="' + name_of_chart + '"]').attr('id');
    console.log(url)
    chrome.tabs.create({ url: url });

  
  }