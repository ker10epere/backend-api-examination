import express from 'express'
import { AppDataSource } from './configs/typeorm/app-datasource.config'
import { routers } from './app'
import { dataSourceProvider } from './commons/middlewares/datasource.middleware'
const { PORT = 3000 } = process.env

AppDataSource.initialize()
  .then(async (ds): Promise<void> => {
    const app = express()

    app.use(dataSourceProvider(ds))
    app.use(routers)

    app.listen(PORT, () => console.log(`running on PORT ${PORT}`))
  })
  .catch(console.log)
