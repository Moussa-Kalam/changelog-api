import { Router, Request, Response } from 'express';
import { body, oneOf, validationResult } from 'express-validator';
import { handleInputErrors } from './utils/middleware';

const router = Router();

// Products
router.get('/products', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    data: {},
  });
});

router.get('/products/:id', () => {});

router.put(
  '/products/:id',
  body('name').isString(),
  handleInputErrors,
  (req: Request, res: Response) => {}
);
router.post(
  '/products',
  body('name').isString(),
  handleInputErrors,
  (req: Request, res: Response) => {}
);
router.delete('/products/:id', () => {});

// Update
router.get('/updates', () => {});
router.get('/updates/:id', () => {});
router.put(
  '/updates/:id',
  body('title').optional(),
  body('body').optional(),
  body('status').optional().isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']),
  body('version').optional(),
  (req: Request, res: Response) => {}
);

router.post(
  '/updates',
  body('title').exists().isString(),
  body('body').exists().isString(),
  (req: Request, res: Response) => {}
);
router.delete('/updates/:id', () => {});

// Update Point
router.get('/update-point', () => {});
router.get('/update-point/:id', () => {});
router.put(
  '/update-point/:id',
  body('name').optional().isString(),
  body('description').optional().isString(),
  (req: Request, res: Response) => {}
);
router.post(
  '/update-point',
  body('name').isString(),
  body('description').isString(),
  body('updateId').exists().isString(),
  (req: Request, res: Response) => {}
);
router.delete('/update-point/:id', () => {});

export default router;
