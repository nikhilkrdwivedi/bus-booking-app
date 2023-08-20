import UserModel from "../models/users.js";

export const create = async (payload = {}) => {
  try {
    const result = await UserModel.create(payload);
    return result;
  } catch (error) {
    throw error;
  }
};

export const update = async (query = {}, payload = {}) => {
  console.log(
    { query, payload }
  )
  try {
    const result = await UserModel.findOneAndUpdate(query, payload, {
      new: true,
    }).lean();
    return result;
  } catch (error) {
    throw error;
  }
};

export const fetch = async (query) => {
  try {
    const result = await UserModel.find(query).lean();
    return result;
  } catch (error) {
    throw error;
  }
};
export const fetchOne = async (query) => {
  try {
    const result = await UserModel.findOne(query).lean();
    return result;
  } catch (error) {
    throw error;
  }
};

export const fetchById = async (_id, optional = {}) => {
  try {
    const query = { _id, ...optional };
    const result = await UserModel.findOne(query).lean();
    return result;
  } catch (error) {
    throw error;
  }
};

export const deleteById = async (_id, optional = {}) => {
  try {
    const query = { _id, ...optional };
    const result = await UserModel.findOneAndUpdate(
      query,
      {
        isActive: false,
      },
      { new: true }
    ).lean();
    return result;
  } catch (error) {
    throw error;
  }
};

export const countDocuments = async (query = {}) => {
  try {
    const result = await UserModel.countDocuments(query).lean();
    return result;
  } catch (error) {
    throw error;
  }
};