
$.ajax({
    type: 'GET',
    url: `${urlApi}/weather/windiestAirport`,
    dataType: 'json',
    success: function ({airport}) {
      document.getElementById('name_of_windiest_airport').innerText = `${airport.name}(${airport.Countrie.name})`
      document.getElementById('metar_of_windiest_aiport').innerText = airport.Metar.raw_text
  
    }
  });
  