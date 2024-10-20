import { DataTypes } from 'sequelize';
import sequelize from '../Db/connection';

export const Category = sequelize.define('Category', {
  nIdCategory: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  sNameCategory: {
    type: DataTypes.STRING
  }
});

export const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100)
  },
  price: {
    type: DataTypes.DECIMAL(10, 2)
  },
  description: {
    type: DataTypes.STRING(200)
  },
  stock: {
    type: DataTypes.BOOLEAN
  },
  link: {
    type: DataTypes.STRING
  },
  category: {
    type: DataTypes.INTEGER,
    references: {
      model: Category,
      key: 'nIdCategory'
    }
  }
});