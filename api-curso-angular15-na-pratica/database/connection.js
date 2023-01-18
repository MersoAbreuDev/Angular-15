const mongoose = require("mongoose")

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;


const connect = () => {
    mongoose.set('strictQuery', false);
    mongoose.connect(`mongodb+srv://merso:js7uTcDw1YlSTxNp@cluster0.kj0u19v.mongodb.net/?retryWrites=true&w=majority`)

    const connection = mongoose.connection;

    connection.on("error", () => {
        console.error("Erro ao conectar com o mongoDB")
    })

    connection.on("open", () => {
        console.log("Conetado ao mongoDB com sucesso!")
    })
}

connect();

module.exports = mongoose;