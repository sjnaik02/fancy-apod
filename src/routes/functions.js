export const findDate = () => {
  let d = new Date();
  return d.toISOString().slice(0,10);
}