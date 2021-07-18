import { Router } from 'express';
import { StatusCodes } from '../StatusCode/StatusCode';
import {
  createCategory,
  deleteCategory,
  getCategories, getPageCategories, updateCategory,
} from './category';

const router = Router();

 router.get('/', async (req, res) => {
  const categories = await getCategories();
   return res.json(categories);
});
 
router.put('/:category', async (req, res) => {
  const newCategory = req.body.newCategory
  const category = req.params.category;  
  await updateCategory(category, newCategory);  
  return res.status(StatusCodes.Ok).send(JSON.stringify({}))
});


router.delete('/:category', async (req, res) => {
    const category = req.params.category; 
    if (!category) {
    return res.status(StatusCodes.BadRequest);
    } 
    try {
     await  deleteCategory(category)
     return res.status(StatusCodes.Ok).send(JSON.stringify({ success: true }))
    }
    catch(e){
      return res.status(StatusCodes.BadRequest).send(e)
    }
  });
  router.post('/', async (req, res) => {
    const category = req.body.category ;
    try {
       await createCategory(category);
      return  res.status(StatusCodes.Ok).send(JSON.stringify({ }))
    } catch (e) {
      return res.status(StatusCodes.BadRequest).send(e);
    }
  });

  router.get('/pageCategories/', async (req, res) => {
    const page=req.query.page as unknown as number;
    const limit=req.query.limit as unknown as number;

   const pageCategories =  await getPageCategories(page,limit)

   return res.json(pageCategories);
  });

export default router;




/**
 * @swagger
 * /category:
 *   get:
 *     summary: Returns categories
 *     tags: [Category]
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
 *    summary: Update category
 *    parameters:
 *      - in: path
 *        name: category
 *      - in: body
 *        name: newCategory
 *        schema:
 *          type: string
 *            properties:
 *                category:
 *                type:string
 *                newCategory:
 *                type:string
 *        required: true
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *     responses:
 *       200:
 *         description: The category description by id
 */

/**
 * @swagger
 * /:category:
 *   delete:
 *     summary: Remove category
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The category id
 *
 *     responses:
 *       200:
 *         description: The category was deleted
 */
/**
 * @swagger
 * /category:
 *   post:
 *     summary: Create  new category
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *       content:
 *         application/json:

 *     responses:
 *       200:
 *         description: the category has been updated
 *       400:
 *         description: the category was not found
 */

/**
 * @swagger
 * /category:
 *   get:
 *     summary: Returns page categories
 *       parameters:
 *       - in: path
 *         name: limit
 *       - in: path
 *         name: page
 *     responses:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */