var button_valider = document.getElementById('Valider')
button_valider.addEventListener('click',getMetar)

function getMetar(){

    var airport = document.getElementById('ICAO_airport').value

    $.ajax({
        type: 'GET',
        url: 'https://api.checkwx.com/metar/'+airport,
        headers: { 'X-API-Key': 'ed3c7cbc98f94a2a852bbacfb6' },
        dataType: 'json',
        success: function (result) {
          document.getElementById('test').innerText = result['data']
        }
      });

}
