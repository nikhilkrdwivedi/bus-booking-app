import TripPlannerModal from '../models/tripPlanner.js'
export const create = async (payload = {}) => {
    try {
        const result = await TripPlannerModal.create(payload);
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
        const result = await TripPlannerModal.find(query).populate('provider').populate('vehicle')
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
        const result = await TripPlannerModal.countDocuments(query).lean();
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
        const result = await TripPlannerModal.findOneAndUpdate(query, payload, {
            new: true,
        });
        return result;
    } catch (error) {
        throw error;
    }
};

export const fetchOne = async (query) => {
    try {
        // const result = await TripPlannerModal.findOne(query).populate('provider').populate('vehicle').lean();
        const result = await TripPlannerModal.findOne(query).lean();
        return result;
    } catch (error) {
        throw error;
    }
};