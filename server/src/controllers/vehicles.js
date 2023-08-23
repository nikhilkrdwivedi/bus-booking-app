import httpResponseMessages from "../constants/httpResponseMessages.js";
import { create, update, fetch, countDocuments, fetchOne } from "../providers/vehicles.js";
import { update as updateProvider } from "../providers/providers.js";
import {
  getPaginationQueryData,
  getPaginationInfo,
} from "../helpers/pagination.js";
const preparePayloadForTrip = (body) => {
  console.log(body)
  const { capacity: { layout } } = body;
  let seatNumber = 1
  const _layout = layout.map(row => {
    return row.map(col => {

      return { ...col, seatNumber: col.seatStatus === "A" ? seatNumber++ : -1 }
    })
  })
  const _body = {
    ...body, capacity: {
      ...body.capacity,
      layout: _layout,
      availableSeats: seatNumber - 1
    }
  };
  console.log({ _body })
  return _body

}
export const createVehicle = async (request, response) => {
  try {
    let { body } = request;
    body = preparePayloadForTrip(body)
    const { provider } = body;
    const vehicle = await create(body);

    await updateProvider({ _id: provider }, { $addToSet: { vehicles: vehicle._id } });
    return response
      .status(200)
      .json({ message: "Provider successfully created.", data: vehicle });
  } catch (error) {
    console.log({ error })
    return response
      .status(500)
      .json({ message: httpResponseMessages.INTERNAL_SERVER_ERROR, data: error });
  }
}
export const getVehicles = async (request, response) => {
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

export const getVehicle = async (request, response) => {
  try {
    const { _id } = request.params;
    const query = { isActive: true, _id }
    const data = await fetchOne(query)


    return response.status(200).json({
      success: true,
      message: httpResponseMessages.FETCH_SUCCESS,
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

export const updateVehicle = async (request, response) => {
  try {
    let updateBody = request.body;
    const { _id } = request.params;

    updateBody = preparePayloadForTrip(updateBody)
    // USER_BLACKLIST_KEYS_FOR_UPDATE.forEach((key) => delete updateBody[key]);
    const data = await update({ _id }, updateBody, {
      new: true,
    });
    await updateProvider({ _id: data.provider }, { $addToSet: { vehicles: data._id } });
    return response
      .status(200)
      .json({ message: "Provider successfully updated.", data });
  } catch (error) {
    console.log({ error })
    return response
      .status(500)
      .json({ message: httpResponseMessages.INTERNAL_SERVER_ERROR, data: error });
  }
};

export default { createVehicle, getVehicles, getVehicle, updateVehicle }