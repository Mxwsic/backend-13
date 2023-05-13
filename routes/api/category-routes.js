const router = require('express').Router();
const { Category, Product } = require('../../models');



router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(categoryData);
  } catch (err) { 
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      inlude: [{ model: Product }],
    });

    if (!categoryData) {
      res.status(404).json({ message: 'Id not find' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create({
      id: req.body.id,
      category_name: req.body.category_name
    });

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updateCategory = await Category.update({
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id
      }
    });

    res.status(200).json(updateCategory);
  } catch (err) {
    res.status(500).json(err); 
  }
});



router.delete('/:id', async (req, res) => {
  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id
      },
    });
    console.log(deleteCategory);
    if (!deleteCategory) {
    res.status(404).json({ message: 'Id not found' });
    return;
    }
    res.status(200).json(deleteCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;