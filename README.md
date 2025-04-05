# Pianificatore di Viaggi Condiviso

## 🚀 Presentazione

**Pianificatore di Viaggi Condiviso** è una piattaforma intuitiva e moderna pensata per facilitare la pianificazione dei viaggi in gruppo. Grazie a funzionalità collaborative, chat real-time e integrazione con API esterne, punta a diventare uno strumento utile, pratico e piacevole da usare per ogni tipo di viaggiatore condiviso.

## ✨ Obiettivo del Progetto

Il progetto mira a sviluppare una web application collaborativa per la pianificazione di viaggi in gruppo, ideale per amici e famiglie. L'app fornisce un ambiente centralizzato dove:

- si votano destinazioni,
- si gestisce un budget condiviso,
- si creano itinerari condivisi,
- si comunica in tempo reale tramite chat,
- si integrano servizi esterni come Google Maps o Booking.

Il focus è su **collaborazione**, **esperienza utente fluida** e **scalabilità**.

---

## 🛠️ Stack Tecnologico

### Front-End
- **React**: libreria principale per la UI
- **React Router**: gestione delle rotte
- **Redux Toolkit / Context API**: gestione stato globale (Da aggiungere solamente nella relazione)
- **Axios**: comunicazione API
- **Material-UI**: design moderno e responsive
- **Socket.IO**: real-time chat e aggiornamenti (Da aggiungere solamente nella relazione)

### Back-End
- **Node.js + Express**: server 
- **Sequelize** con **PostgreSQL**
- **JWT + bcrypt**: autenticazione e sicurezza
- **Middleware**: logging, validazioni, gestione errori

---

## 🪟 Architettura e Componenti

### Front-End

#### Pagine principali
- `Home`, `Login`, `Signup`, `Dashboard`, `TripDetails` ("Chat" da aggiungere solamente nella relazione)

#### Componenti principali
- `Navbar`, `Sidebar`, `TripForm`, `ExpenseList`, `UserProfile` ("ChatInput" da aggiungere solamente nella relazione)

#### Servizi & Utility
- Gestione API: viaggi, utenti, spese, chat ( "chat" da aggiungere solamente nella relazione)
- Integrazione Google Maps, Booking (Ancora da definire)

### Back-End

#### API REST principali
- `/api/auth`: autenticazione (login, register)
- `/api/trips`: gestione viaggi
- `/api/activities`: gestione itinerari
- `/api/budget`: gestione spese
- `/api/messages`: gestione chat

#### Modelli Sequelize
- **User**: `id, name, email, password`
- **Trip**: `id, name, startDate, endDate, createdBy`
- **Activity**: `tripId, name, date, location`
- **Budget**: `tripId, amount, paidBy, splitBetween`
- **Message**: `tripId, userId, text, timestamp` (Da aggiungere solamente nella relazione)

#### Middleware
- JWT Auth
- Gestione errori
- Logging custom

---

## ⚡ Funzionalità Avanzate

- **Chat real-time** via Socket.IO (Da aggiungere solamente nella relazione)
- **Google Maps API**: visualizzazione mappe e luoghi (Ancora da definire)
- **Booking.com / Airbnb API**: ricerca e salvataggio alloggi via affiliazione (Ancora da definire)
- **Hashing sicuro** delle credenziali (bcrypt)

---

## 🚄 Roadmap

### 1. Pianificazione
- Progettazione UX/UI (wireframe)
- Use case: itinerari, spese, voti ("chat, mappa" in relazione)

### 2. Sviluppo Front-End
- Setup struttura React
- Componenti per itinerari, spese ("chat" in relazione)
- Responsive design mobile/desktop

### 3. Sviluppo Back-End
- Setup server Express
- Rotte per tutte le entità
- Autenticazione JWT, hashing con bcrypt
- Configurazione database Sequelize

### 4. Integrazione
- Comunicazione Front-End ↔ Back-End
- Test unitari e di integrazione (Postman)

---

## 📁 Struttura Progetto

### Front-End
```bash
/client
│── /public                      # File pubblici (favicon, index.html)
│── /src                         # Codice sorgente principale
│   │── /assets                  # Immagini, icone, file statici
│   │── /components              # Componenti riutilizzabili
│   │   │── Navbar.js            # Barra di navigazione principale
│   │   │── Sidebar.js           # Menu laterale per la navigazione degli itinerari
│   │   │── Modal.js             # Finestre modali generiche
│   │   │── Card.js              # Card per visualizzare itinerari o spese
│   │   │── TripForm.js          # Modulo per creare o aggiornare un itinerario.
│   │   │── ExpenseList.js       # Visualizza tutte le spese di un itinerario
│   │   │── ExpenseItem.js       # Visualizza i dettagli di una singola spesa
│   │   │── UserProfile.js       # Visualizza il profilo dell'utente.
│   │── /pages                   # Pagine principali 
│   │   │── Home.js      
│   │   │── Login.js    
│   │   │── Signup.js    
│   │   │── Dashboard.js 
│   │   │── TripDetails.js  
│   │   │── Chat.js  
│   │── /services                # API calls e gestione dati (es. Google Maps API)
│   │   │── api.js
│   │── /context                 # Contesto globale (es. autenticazione, stato utente)
│   │   │── AuthContext.js
│   │── /hooks                   # Hook personalizzati (es. useAuth, useFetch) (opz.)
│   │── /styles                  # Stili globali
│   │── /utils                   # Funzioni di supporto (formattazione date, calcoli) (opz.)
│   │── App.js                   # Componente principale dell’app
│   │── index.js                 # Punto di ingresso dell’app
│── package.json                 # Dipendenze e script di progetto
```

### Back-End
```bash
/server
│── /config                       # Configurazione database, env variables
│   ├── database.js               # Configurazione di Sequelize
│── /models                       # Definizione dei modelli Sequelize
│   ├── Users.js      
│   ├── Trips.js      
│   ├── Expenses.js             
│   ├── Activities.js  
│   ├── index.js                  # Inizializzazione dei modelli e associazioni
│── /routes                       # Definizione delle API REST
│   ├── authRoutes.js
│   ├── tripRoutes.js
│   ├── expenseRoutes.js
│── /controllers                  # Logica di business
│   ├── authController.js
│   ├── tripController.js
│   ├── expenseController.js
│── /middleware                   # Middleware per autenticazione e gestione errori
│   ├── authMiddleware.js
│── /utils                        # Funzioni di supporto (hashing password, validazioni)
│── index.js                      # Configurazione Express e middlewares
│── server.js                     # Avvio del server
│── package.json                  # Dipendenze e script
│── README.md                     # Documentazione
```

### Struttura del Database:
**Utenti (`users`):**  Gestisce le informazioni sugli utenti registrati.  
      
```sql
id (PK) | nome | email (UNIQUE) | password | data_creazione
```
      
**Itinerari (`trips`):** Rappresenta un viaggio condiviso tra più utenti.
      
```sql
id (PK) | nome | creatore_id (FK → users.id) | data_inizio | data_fine | destinazione
```
      
**Spese (`expenses`):** Gestisce le spese condivise all'interno di un viaggio.
      
```sql
id (PK) | itinerario_id (FK → trips.id) | importo | pagatore_id (FK → users.id) | categoria | descrizione | data
```
      
**Attività (`activities`):** Rappresenta eventi o tappe di un viaggio.
      
```sql
id (PK) | itinerario_id (FK → trips.id) | nome | descrizione | data | luogo
```
      
**Messaggi chat(`messages`):** Gestisce i messaggi scambiati tra utenti di un viaggio.

```sql
id (PK) | itinerario_id (FK → trips.id) | utente_id (FK → users.id) | testo | timestamp
```

---

> "Viaggiare insieme è bello. Organizzarlo insieme, ancora meglio."
