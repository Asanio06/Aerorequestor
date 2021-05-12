
$.ajax({
    type: 'GET',
    url: `${urlApi}/weather/windiestAirport`,
    dataType: 'json',
    success: function (result) {
        console.log(result)
      document.getElementById('name_of_windiest_airport').innerText = `${result.airport.name}(${result.countrie.name})`
      document.getElementById('metar_of_windiest_aiport').innerText = result.windiestAirport.raw_text
  
    }
  });
  