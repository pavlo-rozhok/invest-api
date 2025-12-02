import { serve } from '@hono/node-server'
import { OpenAPIHono } from '@hono/zod-openapi'
import { swaggerUI } from '@hono/swagger-ui'

import { usersRoutes } from './modules/users/users.routes'

const app = new OpenAPIHono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/users', usersRoutes)

app.doc('/doc', {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'Invest API',
    description: 'Invest API Documentation',
  },
})

app.get('/ui', swaggerUI({ url: '/doc', tagsSorter: `(a, b) => a.localeCompare(b)` }))

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`)
    console.log(`Swagger UI is available at http://localhost:${info.port}/ui`)
  },
)
