

export const getPaginationQueryData = (pageInfo) => {
  let currentPage = parseInt(pageInfo?.currentPage) || 0;
  let limit = parseInt(pageInfo?.limit) || 1;
  let skip = currentPage * limit;

  if (pageInfo?.sendAllRecords === "YES") {
    currentPage = 0;
    skip = 0;
    limit = 0;
  }

  return { skip, limit, currentPage };
};

export const getPaginationInfo = (
  total,
  limit,
  currentPage
) => {
  return {
    totalRecords: total,
    currentPage,
    totalPages: limit ? Math.ceil(total / limit) : 0,
    limit,
  };
};

export default {
  getPaginationQueryData,
  getPaginationInfo,
};