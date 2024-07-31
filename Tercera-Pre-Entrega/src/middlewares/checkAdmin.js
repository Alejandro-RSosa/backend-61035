import { createResponse } from '../utils.js'

export const checkAdmin = async (req, res, next) => {
  try {
    const { role } = req.user;
    if (role !== "admin") createResponse(res, 401, "Unhautorized user, ONLY ADMIN" )
    else next();
  } catch (error) {
    next(error);
  }
};
