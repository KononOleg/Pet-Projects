import { Router } from 'express';
import { StatusCodes } from '../StatusCode/StatusCode';
import {
  createCard,
  deleteCard,
  getAllCards,
  getCards, getPageCards, updateCard,
} from './cards';


const router = Router();


router.get('/:category', async (req, res) => {
   const category = req.params.category;
  const cards = await getCards(category);
  return res.json(cards);
});

router.get('/', async (req, res) => {
 const allCards=await getAllCards();
 return res.json(allCards);
});

router.get('/pageCards/:category', async (req, res) => {
  const page=req.query.page as unknown as number;
  const limit=req.query.limit as unknown as number;
  const category = req.params.category;
  const pageCards =  await getPageCards(category,page,limit);
  return res.json(pageCards);
});

router.put('/:category/:card', async (req, res) => {
  const category = req.params.category;
  const card = req.params.card;
  await updateCard(category,card,req.body); 
  return res.status(StatusCodes.Ok).send(JSON.stringify({}))
});

router.delete('/:category/:card', async (req, res) => {
  const category = req.params.category;
  const card = req.params.card;
  try {
    await deleteCard(category,card)
   return res.status(StatusCodes.Ok).send(JSON.stringify({}))
  }
  catch(e){
    return res.status(StatusCodes.BadRequest).send(e)
  }
});

router.post('/:category', async (req, res) => {
  const category = req.params.category;
  try {
     await createCard(category,req.body);
    return res.status(StatusCodes.Ok).send(JSON.stringify({}))
  } catch (e) {
    return res.status(StatusCodes.BadRequest).send(e);
  } 
});


export default router;


/**
 * @swagger
 * /card/:category:
 *   get:
 *     summary: Returns cards
 *      parameters:
 *      - in: path
 *        name: category
 *     responses:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
/**
 * @swagger
 * /card:
 *   get:
 *     summary: Returns all cards
 *     responses:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */


/**
 * @swagger
 * /card/:category/:card
 *   get:
 *     summary: update card
 *       parameters:
 *       - in: path
 *         name: category
 *       - in: card
 *         name: path
 *       - in: body
 *         name: limit
 *     responses:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */

/**
 * @swagger
 * /category/{id}:
 *  put:
 *    summary: Update cards
 *    parameters:
 *      - in: path
 *        name: category
 *      - in: path
 *        name: card
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *     responses:
 *       200:
 *         description: card update
 */

/**
 * @swagger
 * /category/:card:
 *   delete:
 *     summary: Remove cards
 *     parameters:
 *       - in: path
 *         name: category
*        - in: path
 *         name: card
 *         schema:
 *           type: string
 *         required: true

 *     responses:
 *       200:
 *         description: The card was deleted
 */
/**
 * @swagger
 * /category:
 *   post:
 *     summary: Create  new card
 *     parameters:
 *       - in: path
 *         name: category
 *        - in: path
 *         name: card
 *         schema:
 *           type: string
 *         required: true
 *       content:
 *         application/json:

 *     responses:
 *       200:
 *         description: the card has been updated
 *       400:
 *         description: some mistake
 */