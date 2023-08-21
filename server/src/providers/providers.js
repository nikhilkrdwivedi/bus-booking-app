import ProviderModal  from '../models/providers.js'
export const create = async (payload = {}) => {
    try {
      const result = await ProviderModal.create(payload);
      return result;
    } catch (error) {
      throw error;
    }
  };
  export const fetch = async (
    query,
    skip = 0,
    limit = 0
  ) => {
    try {
      const result = await ProviderModal.find(query)
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
      const result = await ProviderModal.countDocuments(query).lean();
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
    const result = await ProviderModal.findOneAndUpdate(query, payload, {
      new: true,
    });
    return result;
  } catch (error) {
    throw error;
  }
};