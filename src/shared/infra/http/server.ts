import { app } from "./app";

app.listen(3333, () => console.log("Server is running"));

// I have separated the server from the app, so I can access the app without starting the server.