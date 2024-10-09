/*
stdin => Leitura
stdout => Escrita/Saída
pipe => para pegar por partes a string


process.stdin.pipe(process.stdout)

Os tipos mais comuns de Streams
Readable => Leitura
Writable => Escrita
Transform => Transformação
*/

import { Readable, Writable, Transform } from 'node:stream'

class OneToHundredStream extends Readable {
  // _read() método obrigátorio para ler os dados
  index = 1
  _read() {
    const i = this.index++

    setTimeout(() => {
    if(i > 100) {
      this.push(null)
    } else {
      const buf = Buffer.from(String(i))

      this.push(buf)
    }
  }, 1000)
  }
}

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, calback) {
    const tranformed = Number(chunk.toString())* -1

    calback(null, Buffer.from(String(tranformed)))
  }
}

class MultiplyByTenStream extends Writable {
  /*
  chunk => É a parte da leitura, o que é enviado no push
  encoding => Como a informação está codificada
  calback => É chamada quando o processo é finalizado com a informação 
  */
  _write(chunk, encoding, calback) {
    console.log(Number(chunk.toString()) * 10)
    calback()
  }
}

new OneToHundredStream().
pipe(new InverseNumberStream()).
pipe(new MultiplyByTenStream())