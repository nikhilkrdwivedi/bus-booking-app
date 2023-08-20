// import swagger from "swagger-ui-express";

import environment from "./configurations/environment.js";
// const environment= { PORT: 2020}
// import swaggerDocs from "./swagger/docs";
import dbConnect from "./startup/dbConnect.js";
import createServer from "./startup/server.js";

const app = createServer();
// app.use("/docs", swagger.serve);
// app.use("/docs", swagger.setup(swaggerDocs));

app.listen(environment.PORT, async () => {
  console.log(`Server started on PORT [${environment.PORT}]`);
  await dbConnect();
});