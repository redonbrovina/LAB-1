const Store = require('../models/Store');
const Product = require('../models/Product');

class ProductController {
  // Get all products
  static async getAllProducts(req, res) {
    try {
      const products = await Product.findAll({
        include: [{
          model: Store,
          as: 'store'
        }],
        order: [['ProductId', 'ASC']]
      });
      res.json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ message: 'Error fetching products' });
    }
  }

  // Get product by ID
  static async getProductById(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id, {
        include: [{
          model: Store,
          as: 'store'
        }]
      });
      
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      
      res.json(product);
    } catch (error) {
      console.error('Error fetching product:', error);
      res.status(500).json({ message: 'Error fetching product' });
    }
  }

  // Create new product
  static async createProduct(req, res) {
    try {
      const { ProductName, Price, StoreId } = req.body;
      
      if (!ProductName || !Price || !StoreId) {
        return res.status(400).json({ message: 'ProductName, Price, and StoreId are required' });
      }

      // Check if store exists
      const store = await Store.findByPk(StoreId);
      if (!store) {
        return res.status(404).json({ message: 'Store not found' });
      }

      // Validate price
      const price = parseFloat(Price);
      if (price < 0) {
        return res.status(400).json({ message: 'Price must be greater than or equal to 0' });
      }

      const product = await Product.create({
        ProductName,
        Price: price,
        StoreId
      });

      // Return product with store info
      const productWithStore = await Product.findByPk(product.ProductId, {
        include: [{
          model: Store,
          as: 'store'
        }]
      });

      res.status(201).json(productWithStore);
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ message: 'Error creating product' });
    }
  }

  // Update product
  static async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const { ProductName, Price, StoreId } = req.body;

      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      // If StoreId is being updated, check if store exists
      if (StoreId && StoreId !== product.StoreId) {
        const store = await Store.findByPk(StoreId);
        if (!store) {
          return res.status(404).json({ message: 'Store not found' });
        }
      }

      // Validate price if provided
      let price = product.Price;
      if (Price !== undefined) {
        price = parseFloat(Price);
        if (price < 0) {
          return res.status(400).json({ message: 'Price must be greater than or equal to 0' });
        }
      }

      await product.update({
        ProductName: ProductName || product.ProductName,
        Price: price,
        StoreId: StoreId || product.StoreId
      });

      // Return updated product with store info
      const updatedProduct = await Product.findByPk(id, {
        include: [{
          model: Store,
          as: 'store'
        }]
      });

      res.json(updatedProduct);
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ message: 'Error updating product' });
    }
  }

  // Delete product
  static async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      
      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      await product.destroy();
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ message: 'Error deleting product' });
    }
  }

  // Get all products with their stores
  static async getAllProductsWithStores(req, res) {
    try {
      const products = await Product.findAll({
        include: [{
          model: Store,
          as: 'store'
        }],
        order: [['ProductId', 'ASC']]
      });
      res.json(products);
    } catch (error) {
      console.error('Error fetching products with stores:', error);
      res.status(500).json({ message: 'Error fetching products with stores' });
    }
  }
}

module.exports = ProductController;
