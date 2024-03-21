import { Sequelize } from "sequelize";
import db from '../config/db.js'

const Mensaje = db.define('mensajes', {
    message: {
        type: Sequelize.STRING(300),
        allowNull: false
    },
    room: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    author: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    time: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    id_author: {
        type: Sequelize.INTEGER,
        allowNull: true
    },

    
})

export default Mensaje 