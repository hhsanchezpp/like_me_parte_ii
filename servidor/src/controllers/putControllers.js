
const { putLikedQuery, obtenerPostQuery } = require('../dataBase/querys')

const putLikedController = async (req, res) => {
    const { id } = req.params;
    try {

        if (!id) {
            res.status(400).json({
                status: 'Bad Request',
                msg: 'Debes proporcionar un ID de post',
            });
            return;
        }

        const post = await obtenerPostQuery(id, res); 

        if (!post) {
            res.status(404).json({
                msg: `El post con el ID: ${id} no existe`,
            });
            return
        }

        const newLike = post.likes + 1;
        const updatedPost = await putLikedQuery(newLike, id, res);

        res.status(200).json({
            msg: `El post con el ID, tiene un like: ${id}`,
            post: updatedPost,
        });
    } catch (error) {
        res.status(500).json({
            msg: `Error al procesar tu solicitud: ${error.message}`,
            error: error.message,
        });
    }
};

module.exports = {
    putLikedController
}