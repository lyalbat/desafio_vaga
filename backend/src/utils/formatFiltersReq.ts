import { Filters } from "../interfaces/filters"

export const formatFiltersReq = (key: any, value: any) => {
    const filter = (key && value) ? {key, value} as Filters: null
    return filter as Filters
}