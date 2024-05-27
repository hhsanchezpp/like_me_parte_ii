const dataBase = require('../index')

const getAllPostQuery = async () => {
    try {
        const consulta = `SELECT * FROM posts;`
        const result = await dataBase.query(consulta)
        return result
    } catch (error) {
        res.status(500).json({
            msg: `Error al procesar tu solicitud: ${error.message}`
        })
    }
   
}
const newPostQuery = async (titulo, url, descripcion) => {
    try {
        const values = [titulo, url, descripcion]
        const consulta = `INSERT INTO posts (titulo,img,descripcion)
        VALUES ($1,$2,$3) RETURNING *;`
        const result = await dataBase.query(consulta, values)
        return result
    } catch (error) {
        res.status(500).json({
            msg: `Error al nuevo....: ${error.message}`
        })
    }

}
const deletePostQuery = async (id, res) => {
    try {
        const values = [id]
        const consulta = `DELETE FROM posts where id = $1 RETURNING*;`
        const result = await dataBase.query(consulta, values)
        return result
    } catch (error) {
        res.status(500).json({
            msg: `Error al Eliminar: ${error.message}`
        })
    }

}
const putLikedQuery = async (newlike, id, res) => {
    try {
        const values = [newlike, id]
        const consult = "UPDATE posts SET likes = $1 WHERE id = $2 RETURNING *"  
        const result = await dataBase.query(consult, values)
        const post = result.rows[0]
        return post
    } catch (error) {
        res.status(500).json({
            msg: `Error al modi: ${error.message}`
        })
    }
}
const obtenerPostQuery = async (id, res) => {
    try {
        const values = [id]
        const consulta = "SELECT * FROM posts WHERE id = $1;"
        const result = await dataBase.query(consulta, values)
        const post = result.rows[0]
        return post
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            msg: `Error ....: ${error.message}`
        })

    }
}

module.exports = {
    getAllPostQuery,
    newPostQuery,
    deletePostQuery,
    obtenerPostQuery,
    putLikedQuery
}