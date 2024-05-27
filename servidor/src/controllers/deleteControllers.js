const { deletePostQuery, obtenerPostQuery } = require('../dataBase/querys')

const deletePostController = async (req, res) => {
    const { id } = req.params
    try {
        if (id) {
            const post = await obtenerPostQuery(id, res)
            if (!post) {
                res.status(404).json({
                    msg: `El id: ${id} no tiene post`
                });
                return
            }
        } else {
            res.status(400).json({
                status: 'Bad Request',
                msg: 'Debes ingresar un id',
            });
            return
        }
        await deletePostQuery(id, res)
        res.status(200).json({
            msg: `El post con el id ${id} fue eliminado exitosamente`,
        })
        console.log(`El post con el id ${id} fue eliminado exitosamente`)

    } catch (error) {
        res.status(500).json({
            msg: (`Se presentó un error al procesar tu solicitud:, ${error.message}`),
            error: error.message
        })
    }
}
module.exports = {
    deletePostController
}