const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    // Find all tags and include associated Product data
    const tags = await Tag.findAll({
      include: {
        model: Product,
        through: ProductTag,
        as: 'products'
      }
    });
    res.json(tags);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    // Find a single tag by its `id` and include associated Product data
    const tag = await Tag.findByPk(req.params.id, {
      include: {
        model: Product,
        through: ProductTag,
        as: 'products'
      }
    });
    if (!tag) {
      res.status(404).json({ error: 'Tag not found' });
      return;
    }

    res.json(tag);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    // Create a new tag
    const newTag = await Tag.create(req.body);
    res.json(newTag);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    // Update a tag's name by its `id` value
    const [affectedRows] = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    });

    if (affectedRows === 0) {
      res.status(404).json({ error: 'Tag not found' });
      return;
    }

    res.json({ message: 'Tag updated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    // Delete one tag by its `id` value
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (deletedTag === 0) {
      res.status(404).json({ error: 'Tag not found' });
      return;
    }

    res.json({ message: 'Tag deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
