module.exports = dataBase

const routes = require('express').Router()
const { getController, postController, deleteController, putController} = require('../controllers/index')
const { getDataController } = getController
const { newPostController} = postController
const {deletePostController} = deleteController
const {putLikedController} = putController
const {obtenerPostQuery} = require('../dataBase/querys/index')


const verificarSiExisteElViaje = async (req, res, next) => {
    const { id } = req.params
    try {
        await obtenerPostQuery(id,res)
        next()
    } catch (error) {
        res.status(404).send("Id sin nada")
    
    }
}
routes.get("/posts", getDataController)
routes.post("/posts", newPostController)
routes.delete("/posts/:id",verificarSiExisteElViaje, deletePostController)
routes.put("/posts/like/:id", putLikedController)

module.exports = routes