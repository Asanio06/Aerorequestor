const urlApi = 'http://localhost:8000/api';

var button_Request = document.getElementById('Request')
button_Request.addEventListener('click', getMetar)
var button_charts = document.getElementById('Open_charts')
button_charts.addEventListener('click', open_link_of_sia)
var link_vfr_charts = document.getElementById('lien_chart_vfr')
link_vfr_charts.addEventListener('click', open_vfr_chart)

// $.ajax({
//     type: 'GET',
//     url: `${urlApi}/airport/`,
//     dataType: 'json',
//     success: function (result) {
//         const listAirport = result.allAirport;
//         console.log(listAirport[0])
//
//         let selectInput = document.getElementById('ICAO_airport');
//         listAirport.forEach((airport) => {
//             var opt = document.createElement("option");
//             opt.value = airport.ident;
//             opt.text = airport.ident;
//             selectInput.add(opt)
//
//         })
//     }
// });


function getMetar() {

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
            if (flightCategory) {

                if (flightCategory == 'VFR') {
                    advise = "You can do all type of flight";

                } else if (flightCategory == 'MVFR') {
                    advise = "You can do special vfr and IFR";
                } else {
                    advise = "You can also do IFR flight";
                }

            } else {
                advise = 'No advise for this airport';
            }
            document.getElementById('Airport_Advise').innerText = advise;

            document.getElementById('Airport_Advise').style.visibility = 'visible';
            get_charts_of_airport(airportICAO)
        }
    });

}

function get_charts_of_airport(icao_airport) {

    $.ajax({
        type: 'GET',
        url: `${urlApi}/chart/airport/${icao_airport}`,
        dataType: 'json',
        statusCode: {
            400: function () {
                document.getElementById('zone_ifr_charts').style.visibility = 'hidden';
            }
        },
        success: function (result) {
            if (result) {
                document.getElementById('zone_ifr_charts').style.visibility = 'visible';
                const listChart = result.listCarteAerport;
                console.log(result)

                let selectInput = document.getElementById('chart_selected');

                listChart.forEach((chart) => {
                    if (chart.Chart_type == "VFR") {
                        document.getElementById('zone_vfr_charts').style.visibility = 'visible'

                        document.getElementById('lien_chart_vfr').innerHTML = '<a href="' + chart.url + '"' + ' target="_blank">LIEN</a>'
                    } else {

                        let opt = document.createElement("option");
                        opt.value = chart.url;
                        opt.text = chart.Chart_name;
                        selectInput.add(opt)
                    }


                })
            }

        }
    });

}


function open_vfr_chart() {
    var airport = document.getElementById('ICAO_airport').value
    airport = airport.toUpperCase()

    $.ajax({
        type: 'GET',
        url: 'http://asanio.alwaysdata.net/index.php',
        data: {request: "get_url_of_vfr_chart", airport: airport},
        dataType: 'json',
        statusCode: {
            204: function () {
                document.getElementById('zone_vfr_charts').style.visibility = 'hidden'
            }
        },
        success: function (result) {
            if (result) {

                chrome.tabs.create({url: result});

            }

        }
    });

}

function open_link_of_sia() {

    var url = document.getElementById('chart_selected').value

    chrome.tabs.create({url: url, active: false});


}