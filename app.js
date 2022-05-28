const { port } = require('./config')
const server = require('./server/index')

server.listen(port, ()=> {
  console.log(`major events project server running at http://127.0.0.1:${port}`)
})