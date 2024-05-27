const dataBase = require('../dataBase/index')
const { getAllPostQuery } = require('../dataBase/querys/index')

const getDataController = async (req, res) => {

    try {
        const getPosts = await dataBase.query(getAllPostQuery)
        if (getPosts.rowCount) {
                                    console.info("datos cargados OK")
                                    res.status(200).json(getPosts.rows)
                                }
        else {  res.status(200).json({
                msg: 'Nada para mostrar',
                 });  
        }
    } catch (error) {
                        console.error('Error al cargar info:', error.message);
                        res.status(500).json({
                            msg: 'Se produjo un error al cargar de la info',
                            error: error.message
                        });
    }
}
module.exports = {
    getDataController
}