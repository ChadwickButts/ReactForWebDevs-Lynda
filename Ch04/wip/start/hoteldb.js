var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'cbuttsdb90',
  database: 'status_api'
})

connection.connect()

connection.query('SELECT * FROM statuses', function (err, rows) {
  if (err) throw err

  console.log('The solution is: ', rows[0].msg)
})

connection.end()
