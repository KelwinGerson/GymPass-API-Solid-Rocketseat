import { app } from "./app";
import { env } from "./env";

const PORTENV = env.PORT 

app.listen({
    host: '0.0.0.0',
    port: env.PORT,
}).then(() => {
    console.log(`HTTP Server Running in PORT ${PORTENV}`)
})