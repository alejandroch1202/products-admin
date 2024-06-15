import { DataTypes } from 'sequelize'
import db from '../config/db'

const Product = db.define('products', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  availability: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false
  }
})

export default Product
