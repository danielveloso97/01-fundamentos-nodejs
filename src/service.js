/*
  const http = require('http') => Padrão de importação commonJs / Utiliza o require
  import http from 'http' => Padrão ESModule () / Novo padrão para importação
  O prefixo `node:` na importação de um módulo serve para informar que esse módulo é interno do Node.js

  req: Envio da requisição
  res: Resposta da requisição

  HTTP
    - Métodos HTTP
      Post - Get - delete - patch - put
    - URL


  Stateful
    - Sempre armazena informações guardadas em memórias, memórias voláteis
  Stateless
    - Não salva nada em memória, utiliza meios externos "banco de Dados"

  Cabeçalhos (req/res) => metadados

  HTTP Status Code
  100 - 199 => Status Informativo, informaçõe sobre a response
  200 - 299 => Status de sucessso, informações de sucesso da response
  300 - 399 => Status de redirecionamento
  400 - 499 => Status de erro de response
  500 - 599 => Status de erro de servidor
*/

import http from 'node:http'
import { json } from './middlewares/json.js';
import { randomUUID } from 'node:crypto'
import { Database } from '../src/database.js';

const database = new Database()

const server = http.createServer(async (req, res) => {
  const { method, url} = req;

  await json(req, res)

  if ( method === 'GET' && url === '/users') {
    const users = database.select('users')
    
    return res.end(JSON.stringify(users))
  }

  if (method === 'POST' && url === '/users') {
    const { name, email } = req.body
    const user = {
      id: randomUUID(),
      name,
      email,
    }

    database.insert('users', user)
    return res.writeHead(201).
    end('Criação de Usuário test')
  }

  return res.writeHead(404).end('A rota não existe')
})

server.listen(3333) //Para ouvir a porta 3333