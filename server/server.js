process.on('uncaughtException', (err) => {
  console.error('🔴 Eccezione non catturata:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('🔴 Reiezione non gestita:', reason);
});


const express = require('express');
const db = require('./models');

const app = express();

// ✅ Middleware per CORS
const cors = require('cors');

app.use(cors());

// ✅ LOG: Traccia ogni richiesta per debugging
app.use((req, res, next) => {
  console.log(`📬 Richiesta ricevuta: ${req.method} ${req.url}`);
  console.log("Headers:", req.headers);
  next();
});

// ✅ Middleware per parsing JSON
app.use(express.json());


// ✅ Import delle route
const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const tripRoutes = require("./routes/tripRoutes");
const activityRoutes = require("./routes/activityRoutes");

app.use("/auth", authRoutes);
app.use("/expense", expenseRoutes);
app.use("/trip", tripRoutes);
app.use("/activity", activityRoutes);

// Test della connessione al database
db.sequelize.authenticate()
    .then(() => console.log('Connessione al database avvenuta con successo!'))
    .catch((err) => console.error('Impossibile connettersi al database:', err));

// Sincronizzazione del database e dei modelli
db.sequelize.sync({ force: false }) 
    .then(() => console.log("Database & tabelle aggiornate!"))
    .catch((err) => console.error("Errore sincronizzazione database:", err));

// Avvio del server
const PORT = 5001;
app.listen(PORT, () => console.log(`Server avviato su http://localhost:${PORT}`));


process.on('exit', (code) => {
  console.log(`❌ Il processo Node è terminato con codice: ${code}`);
});
