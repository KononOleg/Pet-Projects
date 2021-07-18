import { Router } from 'express';
import { StatusCodes } from '../StatusCode/StatusCode';
import { logIn } from './login';


const router = Router();

router.post('/',async (req, res) => {
  const login = req.body.login; 
  const password = req.body.password; 

  try {
    await logIn(login,password);
    return res.status(StatusCodes.Ok).send(JSON.stringify({ success: true }))
   }
   catch(e){
     return res.status(StatusCodes.BadRequest).send(JSON.stringify({ success: false }))
   }
});


export default router;



/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login admin
 *     tags: [Login]
 * *     parameters:
 *       - in: body
 *         name: login
 *          required: true
 *       - in: body
 *         name: password
 *          required: true
 *         schema:
 *           type: object
 *            properties:
 *              name:
 *                type:string
 *              password:
 *                type:string
 *          content:
 *             application/json:
 *     responses:
 *       200:
 *         description:  success: true 
 *       400:
 *         description:  success: false 
 */