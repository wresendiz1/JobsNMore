import getPageData from "../components/Pagination/PaginationHelper";

export const ChangePage = (action, page, setQuery) => {
  getPageData(action, page).then((pg) => {
    setQuery((currQuery) => ({ ...currQuery, page: pg }));
  });
};

export const ShowPerPage = (num, setQuery) => {
  setQuery((currQuery) => ({ ...currQuery, per_page: num, page: 1 }));
};

export const SortPage = (form, setQuery) => {
  setQuery((currQuery) => ({
    ...form,
    per_page: currQuery.per_page,
    page: 1,
  }));
};
