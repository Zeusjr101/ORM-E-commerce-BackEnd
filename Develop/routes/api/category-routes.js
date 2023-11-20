const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoriesData = await Category.findAll({
      include:[{ model: Product }],
    });
    res.status(200).json(categoriesData);
    }catch (err){
      console.error(err);
      res.status(500).json
    }
});

router.get('/:id',async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk({
      includes:[{ model: Product}],
    });
    if (!categoryData){
      res.status(404).json({ message: 'category not fund' });
      return;
    }
    res.status(200).json(categoriesData);
  }catch (err){
    console.error(err);
    res.status(500).json
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const mewCategory = await Category.create(req.body);
    res.status(200).json(mewCategory);
  }catch (err) {
    console.error(err);
    res.status(500).json(err);
  }


});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update(req.body,{
      where: {id: req.params.id},
    });
    if(updateCategory[0] === 0) {
      res.status(404).json ({message:'Category not found'});
      return;
    }
    res.status(200).json ({ message: 'Category update successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy({
      where: {id: req.params.id},
    });
    if (deleteCategory === 0) {
      res.status(404).json({ message:'Category not found'})
      return;
  }
  res.status(200).json({ message:'Category deleted successfully'});
}catch (err){
  console.error(err);
  res.status(500).json(err);
}
});

module.exports = router;
