import { Transform } from 'node:stream'
import http from 'node:http'

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, calback) {
    const tranformed = Number(chunk.toString())* -1
    
    console.log(tranformed)

    calback(null, Buffer.from(String(tranformed)))
  }
}


/*
  Para esse caso:
    req: ReadableStream
    res: WritableStream
*/
const server = http.createServer(async (req, res) => {
  const buffers = []

  //sintaxe Para percorrer cada pedacinho da stream/requisição
  for await (const chunk of req) {
    buffers.push(chunk)
  }

  //Para concatenar os pedaços lidos da stream
  const fullStreamContent = Buffer.concat(buffers).toString()

  console.log(fullStreamContent)
  
  return res.end(fullStreamContent)
})

server.listen(3334)