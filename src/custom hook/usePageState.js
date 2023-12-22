import { useSearchParams } from "react-router-dom";

export const usePageState = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const defaultParams = { page: 1, pageSize: 8, search: "", status: "reset" };

  const currentPage = searchParams.get("page") || defaultParams.page;
  const currentPageSize =
    searchParams.get("pageSize") || defaultParams.pageSize;
  const currentSearch = searchParams.get("search") || defaultParams.search;
  const currentStatus = searchParams.get("status") || defaultParams.status;

  const setPage = (newParams) => {
    setSearchParams((prevParams) => {
      const allParams = Array.from(prevParams.entries()).reduce(
        (acc, [key, value]) => {
          return { ...acc, [key]: value };
        },
        {}
      );
      const finalParams = { ...allParams, ...newParams };
      const cleanedParams = removeDefaultParams(finalParams, defaultParams);
      return cleanedParams;
    });
  };
  const removeDefaultParams = (params, defaultParams) => {
    const cleanedParams = { ...params };
    for (const [key, value] of Object.entries(defaultParams)) {
      if (cleanedParams[key] === value) {
        delete cleanedParams[key];
      }
    }
    return cleanedParams;
  };

  const collection = {
    page: currentPage,
    pageSize: currentPageSize,
    search: currentSearch,
    status: currentStatus,
  };

  return [collection, setPage];
};
