import connection from "./database.js";
import app from "./service.js";

connection()

app.listen(app.get('port'), () => {
    console.log(`El servidor esta activo en http://localhost:${app.get('port')}`)
})