const getPageData = async (action, page) => {
  switch (action) {
    case "Next":
      return page.current_page + 1;
    case "Prev":
      return page.current_page - 1;
    case "First":
      return 1;
    case "Last":
      return page.total;
    default:
      return action;
  }
};
export default getPageData;
