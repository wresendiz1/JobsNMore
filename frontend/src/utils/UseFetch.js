import { useEffect } from "react";

const fetchAsync = async (url, signal, params = null) => {
  let res;
  if (params) {
    res = await fetch(`${url}?${new URLSearchParams(params)}`, { signal });
  } else {
    res = await fetch(url, { signal });
  }
  const data = await res.json();
  return data;
};

function UseFetch(url, setters, query = null) {
  useEffect(
    () => {
      const controller = new AbortController();
      const { signal } = controller;

      fetchAsync(url, signal, query).then((data) => {
        const names = Object.keys(setters);
        names.forEach((key) => {
          setters[key](data[key]);
        });
      });

      return () => {
        controller.abort();
      };
    },
    query
      ? [
          query.sort_by,
          query.order,
          query.search,
          query.search_by,
          query.per_page,
          query.page,
        ]
      : []
  );
}
export default UseFetch;
