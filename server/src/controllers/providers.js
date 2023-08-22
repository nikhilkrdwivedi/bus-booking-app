
import httpResponseMessages from "../constants/httpResponseMessages.js";
import { create, fetch, countDocuments, update } from "../providers/providers.js";
import {
  getPaginationQueryData,
  getPaginationInfo,
} from "../helpers/pagination.js";
export const createProvider = async (request, response) => {
  try {
    const { body } = request;
    const user = await create(body);

    return response
      .status(200)
      .json({ message: "Provider successfully created.", data: user });
  } catch (error) {
    console.log({ error })
    return response
      .status(500)
      .json({ message: httpResponseMessages.INTERNAL_SERVER_ERROR, data: error });
  }
}

export const getProviders = async (request, response) => {
  try {
    const query = { isActive: true }
    const { skip, limit, currentPage } = getPaginationQueryData(request.query);
    const [data, total] = await Promise.all([
      fetch(query, skip, limit),
      countDocuments(query),
    ]);
    const pagination = getPaginationInfo(total, limit, currentPage);

    return response.status(200).json({
      success: true,
      message: httpResponseMessages.FETCH_SUCCESS,
      pagination,
      data,
    });
  } catch (error) {
    console.log({ error })
    return response.status(500).json({
      success: false,
      message: httpResponseMessages.INTERNAL_SERVER_ERROR,
      error,
    });
  }
};
export const updateProvider = async (request, response) => {
  try {
    const updateBody = request.body;
    const { _id } = request.params;


    // USER_BLACKLIST_KEYS_FOR_UPDATE.forEach((key) => delete updateBody[key]);
    const data = await update({ _id }, updateBody, {
      new: true,
    });
    return response
      .status(200)
      .json({ message: "Provider successfully updated.", data });
  } catch (error) {
    return response
      .status(500)
      .json({ message: httpResponseMessages.INTERNAL_SERVER_ERROR, data: error });
  }
};
export default { createProvider, getProviders, updateProvider }