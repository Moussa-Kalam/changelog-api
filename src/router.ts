import { Router, Request, Response } from 'express';

const router = Router();

// Products
router.get('/products', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    data: {},
  });
});

router.get('/products/:id', () => {});
router.put('/products/:id', () => {});
router.post('/products', () => {});
router.delete('/products/:id', () => {});

// Update
router.get('/updates', () => {});
router.get('/updates/:id', () => {});
router.put('/updates/:id', () => {});
router.post('/updates', () => {});
router.delete('/updates/:id', () => {});

// Update Point
router.get('/update-point', () => {});
router.get('/update-point/:id', () => {});
router.put('/update-point/:id', () => {});
router.post('/update-point', () => {});
router.delete('/update-point/:id', () => {});

export default router;
