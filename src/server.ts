

import { prisma } from "./lib/prisma"
import { app } from "./app"
import 'dotenv/config';

async function main() {
  const port=process.env.PORT!
  try {
    await prisma.$connect()
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
  } catch (error) {
    await prisma.$disconnect()
    console.log(error)
  }
}
main()

