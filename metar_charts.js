var button_Request = document.getElementById('Request')
button_Request.addEventListener('click', getMetar)
var button_charts = document.getElementById('Open_charts')
button_charts.addEventListener('click', open_link_of_sia)


function getMetar() {

    var airportICAO = document.getElementById('ICAO_airport').value
    airportICAO = airportICAO.toUpperCase()

    $.ajax({
        type: 'GET',
        url: `${urlApi}/airport/${airportICAO}`,
        dataType: 'json',
        success: function ({airport}) {
            document.getElementById('zone_display_metar').style.visibility = 'visible';
            document.getElementById('Metar_display').innerText = airport.Metar.raw_text;
            const flightCategory = airport.Metar.flight_category;
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
            get_charts_of_airport(airport)
        }
    });

}

function get_charts_of_airport(airport) {

    const charts = airport.Charts;

    if (airport.Charts.length === 0) {
        document.getElementById('zone_ifr_charts').style.visibility = 'hidden';

    } else {
        document.getElementById('zone_ifr_charts').style.visibility = 'visible';

        let selectInput = document.getElementById('chart_selected');
        selectInput.innerHTML = ""
        charts.forEach((chart) => {
            if (chart.Chart_type == "VFR") {
                document.getElementById('zone_vfr_charts').style.visibility = 'visible'

                document.getElementById('lien_chart_vfr').innerHTML = '<a href="' + chart.Chart_url + '"' + ' target="_blank">LIEN</a>'
            } else {

                let opt = document.createElement("option");
                opt.value = chart.Chart_url;
                opt.text = chart.Chart_name;
                selectInput.add(opt)
            }


        })
    }



}


function open_link_of_sia() {

    var url = document.getElementById('chart_selected').value

    chrome.tabs.create({url: url, active: false});


}