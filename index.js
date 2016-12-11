// Converting SQL to JSON and change the encoded poly to an array of locations
var fs = require('fs');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'P@ssw0rd',
  database: 'test'
});
// Function credits goes to :
// https://gist.github.com/ismaels/6636986

function decode(encoded) {
  // array that holds the points
  var points = []
  var index = 0,
    len = encoded.length;
  var lat = 0,
    lng = 0;
  while (index < len) {
    var b, shift = 0,
      result = 0;
    do {
      b = encoded.charAt(index++).charCodeAt(0) - 63; //finds ascii                                                                                    //and substract it by 63
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);


    var dlat = ((result & 1) != 0 ? ~(result >> 1) : (result >> 1));
    lat += dlat;
    shift = 0;
    result = 0;
    do {
      b = encoded.charAt(index++).charCodeAt(0) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    var dlng = ((result & 1) != 0 ? ~(result >> 1) : (result >> 1));
    lng += dlng;

    points.push({ latitude: (lat / 1E5), longitude: (lng / 1E5) })
  }
  return points
}
connection.connect();
connection.query('SELECT * from sa_regions;', function (err, rows, fields) {
  if (err) throw err;
  var tempencode = '';
  for (var i = 0; i < rows.length; i++) {
    tempencode = rows[i].location.trim();
    rows[i].location = decode(tempencode);
  }
  fs.writeFile('./filename.json', JSON.stringify(rows), function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
});

connection.end();
