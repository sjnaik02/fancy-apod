export const findDate = (pageIndex) => {
  let d = new Date();
  let date = new Date(d.getTime());
  date.setDate(d.getDate() + pageIndex);

  return date.toISOString().slice(0,10);
}