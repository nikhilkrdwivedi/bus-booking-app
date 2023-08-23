import VehicleModal from '../models/vehicles.js'
export const create = async (payload = {}) => {
  try {
    const result = await VehicleModal.create(payload);
    return result;
  } catch (error) {
    throw error;
  }
};
export const fetch = async (
  query,
  skip = 0,
  limit = 0,
  sortBy = 'createdAt',
  orderBy = -1,
) => {
  try {
    const result = await VehicleModal.find(query).populate('provider')
      .sort({ [sortBy]: orderBy })
      .skip(skip)
      .limit(limit)
      .lean();
    return result;
  } catch (error) {
    throw error;
  }
};
export const countDocuments = async (query = {}) => {
  try {
    const result = await VehicleModal.countDocuments(query).lean();
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
    const result = await VehicleModal.findOneAndUpdate(query, payload, {
      new: true,
    });
    return result;
  } catch (error) {
    throw error;
  }
};

export const fetchOne = async (query) => {
  try {
    const result = await VehicleModal.findOne(query).lean();
    return result;
  } catch (error) {
    throw error;
  }
};