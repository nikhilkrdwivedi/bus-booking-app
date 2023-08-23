import bookingModal from '../models/bookings.js'
export const create = async (payload = {}) => {
    try {
        const result = await bookingModal.create(payload);
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
        const result = await bookingModal.find(query).populate('trip')
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
        const result = await bookingModal.countDocuments(query).lean();
        return result;
    } catch (error) {
        throw error;
    }
};


// export const update = async (query = {}, payload = {}) => {
//     console.log(
//         { query, payload }
//     )
//     try {
//         const result = await bookingModal.findOneAndUpdate(query, payload, {
//             new: true,
//         });
//         return result;
//     } catch (error) {
//         throw error;
//     }
// };

// export const fetchOne = async (query) => {
//     try {
//         // const result = await bookingModal.findOne(query).populate('provider').populate('vehicle').lean();
//         const result = await bookingModal.findOne(query).lean();
//         return result;
//     } catch (error) {
//         throw error;
//     }
// };