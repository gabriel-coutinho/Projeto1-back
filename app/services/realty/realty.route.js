const realtyService = require('./realty.service');
const HttpStatusCodes = require('http-status-codes');
const jsonWebToken = require('../../core/jsonWebToken');

module.exports = (app, io) => {

    /**
     * @swagger
     * /realties:
     *   post:
     *     tags:
     *       - Realties
     *     summary: Creates a Realty
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
     *             - street
     *             - number
     *             - city
     *             - zipCode
     *             - state
     *             - neighborhood
     *             - literCost
     *           properties:
     *             name:
     *               type: string
     *             street:
     *               type: string
     *             number:
     *               type: string
     *             city:
     *               type: string
     *             zipCode:
     *               type: string
     *             state:
     *               type: string
     *             neighborhood:
     *               type: string
     *             literCost:
     *               type: string

     *           example: {
     *               "name": "Casa principal",
     *               "street": "Somewhere in Paris, France)",
     *               "number": "12",
     *               "city": "Paris",
     *               "zipCode": "555-5555",
     *               "state": "-",
     *               "neighborhood": "Bairro Latino",
     *               "literCost": "15"
     *           }
     *     responses:
     *       201:
     *         description: CREATED
     *         headers:
     *           Location:
     *             schema:
     *               type: string
     *             description: Endpoint to get the created realties
     *             example: {
     *               "Location": "/realties/secret"
     *             }
     *       default:
     *         description: Error creating Realty
     */
    app.post('/' , async (req, res) => {
        try {
            const Realty = await realtyService.createAsync(req.body);
            return res.status(HttpStatusCodes.CREATED).send();
        } catch (err) {
            return res.status(HttpStatusCodes.NOT_ACCEPTABLE).json((err && err.message));
        }
    });

    /**
     * @swagger
     * /realties:
     *   get:
     *     tags:
     *        - Realties
     *     summary: Get all realties
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
     *               street:
     *                 type: string
     *               number:
     *                 type: string
     *               city:
     *                 type: string
     *               zipCode:
     *                 type: string
     *               state:
     *                 type: string
     *               neighborhood:
     *                 type: string
     *               literCost:
     *                 type: string
     *               createdAt:
     *                 type: date
     *               updatedAt:
     *                 type: date
     *           example: [
     *            {
     *               "id": 1,
     *               "name": "Casa principal",
     *               "street": "Somewhere in Paris, France)",
     *               "number": "12",
     *               "city": "Paris",
     *               "zipCode": "555-5555",
     *               "state": "-",
     *               "neighborhood": "Bairro Latino",
     *               "literCost": "15",
     *               "createdAt": "2018-09-27T15:52:50.462Z",
     *               "updatedAt": "2018-09-27T15:52:50.462Z"
     *            },
     *            {
     *               "id": 2,
     *               "name": "Casa da praia",
     *               "street": "Somewhere in Ibiza, Spain)",
     *               "number": "5",
     *               "city": "Ibiza",
     *               "zipCode": "533-5333",
     *               "state": "-",
     *               "neighborhood": "Beach",
     *               "literCost": "13",
     *               "createdAt": "2018-09-27T15:52:50.462Z",
     *               "updatedAt": "2018-09-27T15:52:50.462Z"
     *            }
     *           ]
     */
    app.get('/'  ,  async (req, res) => {
        const Realty = await realtyService.showAllAsync();
        if (!Realty) {
            return res.status(HttpStatusCodes.NOT_FOUND).send();
        }
        return res.json(Realty);

    });

    /**
     * @swagger
     * /realties/{id}:
     *   get:
     *     tags:
     *       - Realties
     *     summary: Get a Realty by id
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
     *               street:
     *                 type: string
     *               number:
     *                 type: string
     *               city:
     *                 type: string
     *               zipCode:
     *                 type: string
     *               state:
     *                 type: string
     *               neighborhood:
     *                 type: string
     *               literCost:
     *                 type: string
     *               createdAt:
     *                 type: date
     *               updatedAt:
     *                 type: date
     *           example: {
     *               "id": 1,
     *               "name": "Casa principal",
     *               "street": "Somewhere in Paris, France)",
     *               "number": "12",
     *               "city": "Paris",
     *               "zipCode": "555-5555",
     *               "state": "-",
     *               "neighborhood": "Bairro Latino",
     *               "literCost": "15",
     *               "createdAt": "2018-09-27T15:52:50.462Z",
     *               "updatedAt": "2018-09-27T15:52:50.462Z"
     *           }
     */
    app.get('/:id'  ,async (req, res) => {
        const id = req.params.id;
        const Realty = await realtyService.showAsync(id);
        if (!Realty) {
            return res.status(HttpStatusCodes.NOT_FOUND).send();
        }
        return res.json(Realty);
    });

    
    /**
     * @swagger
     * /realties/{id}:
     *   delete:
     *     tags:
     *       - Realties
     *     summary: Delete an Realty
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
     *         description: Realty not found
     */

    app.delete('/:id'  ,
        async (req, res) => {
            const id = req.params.id;
            let result = await realtyService.destroyAsync(id);
            if (!result) {
                return res.status(HttpStatusCodes.NOT_FOUND).send();
            }
            return res.status(HttpStatusCodes.OK).send();
        });
};