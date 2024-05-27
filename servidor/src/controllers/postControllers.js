const dataBase = require('../dataBase/index')
const { newPostQuery } = require('../dataBase/querys')

const newPostController = async (req, res) => {

    const { titulo, url, descripcion } = req.body;
    const post = [titulo, url, descripcion]

    try {
        if (!titulo && !url && !descripcion) {
            console.warn('Complatar los campos para crear un nuevo post');
            res.status(400).json({
                msg: 'Completar lod campos para crear un nuevo post'
            })
            return
        }
        if (!titulo) {
            console.warn('El campo titulo esta vació');
            res.status(400).json({
                msg: 'El campo titulo esta vació'
            })
            return
        }
        if (!url) {
            console.warn('Favor, cargar una imagen')
            res.status(400).json({
                msg: 'Carga una imagen para el post'
            })
            return
        }
        if (!descripcion) {
            console.warn('Debe ingresar una descripción al post')
            res.status(400).json({
                msg: 'Agrega una descripción al post'
            })
            return
        }

        const createPost = await dataBase.query(newPostQuery, post)
        res.status(200).json({
            msg: 'Post creado con éxito!!',
            dataCount: createPost.rowCount,
            data: createPost.rows
        })

    } catch (error) {
        console.error(`Error en creación del post:`, error.message)
        res.status(500).json({
            msg: `Hubo un error al procesar tu solicitud`,
            error: error.message
        })
    }
}
module.exports = {
    newPostController
}