import { Filters } from "../../interfaces/filters";

export const fetchDataFactory = async (
  page: number,
  limit: number,
  filter: Filters | null,
  repository: Function,
  dbKey: string,
) => {
  const skipValue = (page - 1) * limit;
  const response = await repository(skipValue, limit, filter);
  return {
    [dbKey]: response[dbKey],
    pagination: {
      total: response.total,
      currentPage: page,
      totalPages: Math.ceil(response.total / limit),
    },
  };
};