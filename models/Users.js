import { Model, DataTypes } from "sequelize";
import sequelize from "../services/sequelize";
import md5 from "md5";


class Users extends Model {
  static passwordHash(password) {
    return md5(md5(password) + '_safe')
  }
}

Users.init({
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,

    
   
  },
  email: {
    type: DataTypes.STRING
  },
  fName: {
    type: DataTypes.STRING
  },
  lName: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING(50),
    set(val) {
      this.setDataValue('password', Users.passwordHash(val))
    },
    get() {
      return undefined;
    }
  },
}, {
  sequelize,
  modelName: 'Users',
  tableName: 'users',
  createdAt:false,
  updatedAt:false

})



export default Users
