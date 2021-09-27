import Users from "../models/Users";
import HttpError from "http-errors";
import md5 from "md5";
import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env;

class UsersController {

  static login = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({
        where: {
          email
        }
      });
      const isLogin = user && user.getDataValue('password') === Users.passwordHash(password);

      if (!isLogin) {
        throw HttpError(403, 'Invalid email or password')
      }

      const token = jwt.sign({ userId: user.id }, JWT_SECRET);

      res.json({
        status: 'ok',
        token,
        isLogin
      })
    } catch (e) {
      next(e)
    }
  }

  static register = async (req, res, next) => {
    try {
      const { email, password, fName, lName } = req.body;

      const user = await Users.create({
        email, fName, lName, password
      })

      // const user = await Users.getUser(userId);

      res.json({
        status: 'ok',
        user
      })
    } catch (e) {
      next(e)
    }
  }

  static profile = async (req, res, next) => {
    try {
      const { userId } = req;
      const user = await Users.findByPk(userId);
      res.json({
        status: 'ok',
        user
      })
    } catch (e) {
      next(e)
    }
  }


  static usersList = async (req, res, next) => {
    try {
      const { page = 1 } = req.query;
      const limit = 2;
      const offset = (page - 1) * limit;
      const users = await Users.findAll({
        limit,
        offset,
      });
      const total = await Users.count();

      const findAndCountAll = await Users.findAndCountAll({
        limit,
        offset,
      })

      const findOne = await Users.findOne({
        where: {
          $or: [
            { fName: 'Poxos' },
            { fName: 'Armen' },
            { lName: 'Poxosyan' },
          ]
        },
      })


      // const [total, users] = await Promise.all([
      //   Users.count(),
      //   Users.findAll({
      //     limit,
      //     offset,
      //   }),
      // ])

      res.json({
        status: 'ok',
        findOne,
        findAndCountAll,
        total,
        pages: Math.ceil(total / limit),
        users
      })
    } catch (e) {
      next(e)
    }
  }

}

export default UsersController;
