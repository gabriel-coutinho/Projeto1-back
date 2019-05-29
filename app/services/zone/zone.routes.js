const zoneService = require('./zone.service');
const HttpStatusCodes = require('http-status-codes');
const jsonWebToken = require('../../core/jsonWebToken');

module.exports = (app, io) => {

    /**
     * @swagger
     * /zones:
     *   post:
     *     tags:
     *       - Zones
     *     summary: Creates a Zone
     *     consumes:
     *       - application/json
     *     parameters:
     *       - name: body
     *         in: body
     *         required: true
     *         schema:
     *           type: object
     *           required:
     *             - name
     *           properties:
     *             name:
     *               type: string
     *           example: {
     *               "name": "Cozinha",
     *           }
     *     responses:
     *       201:
     *         description: CREATED
     *         headers:
     *           Location:
     *             schema:
     *               type: string
     *             description: Endpoint to get the created zones
     *             example: {
     *               "Location": "/zones/secret"
     *             }
     *       default:
     *         description: Error creating Zone
     */
    app.post('/' , async (req, res) => {
        try {
            const Zone = await zoneService.createAsync(req.body);
            return res.status(HttpStatusCodes.CREATED).send();
        } catch (err) {
            return res.status(HttpStatusCodes.NOT_ACCEPTABLE).json((err && err.message));
        }
    });

    /**
     * @swagger
     * /zones:
     *   get:
     *     tags:
     *        - Zones
     *     summary: Get all zones
     *     consumes:
     *        - application/json
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           type: array
     *           items:
     *             properties:
     *               id:
     *                 type: integer
     *               name:
     *                 type: string
     *               createdAt:
     *                 type: date
     *               updatedAt:
     *                 type: date
     *           example: [
     *            {
     *               "id": 1,
     *               "name": "Cozinha",
     *               "createdAt": "2018-09-27T15:52:50.462Z",
     *               "updatedAt": "2018-09-27T15:52:50.462Z"
     *            },
     *            {
     *               "id": 2,
     *               "name": "Banheiro",
     *               "createdAt": "2018-09-27T15:52:50.462Z",
     *               "updatedAt": "2018-09-27T15:52:50.462Z"
     *            }
     *           ]
     */
    app.get('/'  ,  async (req, res) => {
        const Zone = await zoneService.showAllAsync();
        if (!Zone) {
            return res.status(HttpStatusCodes.NOT_FOUND).send();
        }
        return res.json(Zone);

    });

    /**
     * @swagger
     * /zones/{id}:
     *   get:
     *     tags:
     *       - Zones
     *     summary: Get a Zone by id
     *     consumes:
     *       - application/json
     *     parameters:
     *       - in: path
     *         name: id
     *     responses:
     *       200:
     *         description: OK
     *         schema:
     *           type: body
     *           items:
     *             properties:
     *               id:
     *                 type: integer
     *               name:
     *                 type: string
     *               createdAt:
     *                 type: date
     *               updatedAt:
     *                 type: date
     *           example: {
     *               "id": 1,
     *               "name": "Cozinha",
     *               "createdAt": "2018-09-27T15:52:50.462Z",
     *               "updatedAt": "2018-09-27T15:52:50.462Z"
     *           }
     */
    app.get('/:id'  ,async (req, res) => {
        const id = req.params.id;
        const Zone = await zoneService.showAsync(id);
        if (!Zone) {
            return res.status(HttpStatusCodes.NOT_FOUND).send();
        }
        return res.json(Zone);
    });

    
    /**
     * @swagger
     * /zones/{id}:
     *   delete:
     *     tags:
     *       - Zones
     *     summary: Delete an Zone
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *     consumes:
     *       - application/json
     *     responses:
     *       200:
     *         description: OK
     *       404:
     *         description: Zone not found
     */

    app.delete('/:id'  ,
        async (req, res) => {
            const id = req.params.id;
            let result = await zoneService.destroyAsync(id);
            if (!result) {
                return res.status(HttpStatusCodes.NOT_FOUND).send();
            }
            return res.status(HttpStatusCodes.OK).send();
        });
};