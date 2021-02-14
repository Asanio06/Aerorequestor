$.ajax({
    type: 'GET',
    url: 'http://asanio.alwaysdata.net/index.php',
    dataType: 'json',
    data : {request :'Windiest_airport' },
    success: function (result) {
      document.getElementById('name_of_windiest_airport').innerText = result['name_of_airport'] + '(' + result['name_of_countrie'] + ')'
      document.getElementById('metar_of_windiest_aiport').innerText = result['metar']
  
    }
  });
  