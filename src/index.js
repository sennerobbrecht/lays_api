require("dotenv").config()
const express = require("express")
const cors = require("cors")
const http = require("http")
const { Server } = require("socket.io")
const connectDB = require("./config/db")

const app = express()

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
)

app.options("*", cors())
app.use(express.json())

connectDB()

app.use("/api/v1/bag", require("./routes/bag.routes"))
app.use("/api/v1/user", require("./routes/user.routes"))
app.use("/api/v1/vote", require("./routes/vote.routes"))

app.get("/", (req, res) => {
  res.send("Lays API v1 running")
})

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "*"
  }
})

io.on("connection", socket => {
  socket.on("disconnect", () => {})
})

app.set("io", io)

const PORT = process.env.PORT || 4000
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
