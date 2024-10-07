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
import { routes } from './routes.js';
import { extractQueryParams } from './utils/extract-query-params.js';

const server = http.createServer(async (req, res) => {
  const { method, url} = req;

  await json(req, res)

 const route = routes.find(route => {
  return route.method === method && route.path.test(url)
 })

 if (route) {
  const routeParams = req.url.match(route.path)

  const { query, ...params } = routeParams.groups

  req.params = params
  req.query = query ? extractQueryParams(query) : {}

  req.params = { ...routeParams.groups }

  return route.handler(req, res)
 }

  return res.writeHead(404).end('A rota não existe')
})

server.listen(3333) //Para ouvir a porta 3333