const express = require('express');
const router = express.Router();
const courseController = require('../app/controllers/courseController');

router.get(
  '/create',
  // function (req, res, next) {
  //   if (req.query.ve === "vevip") return next();
  //   res.status(403).json({ message: "Access denied" });
  // },
  courseController.create,
);
router.post('/store', courseController.store);
router.post('/handle-form-actions', courseController.handleFormActions);
router.get('/:id/edit', courseController.edit);
router.put('/:id', courseController.update);
router.patch('/:id/restore', courseController.restore);
router.delete('/:id/force', courseController.forceDestroy);
router.delete('/:id', courseController.destroy);
router.get('/:slug', courseController.show);

module.exports = router;
