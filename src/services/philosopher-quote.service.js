import api from "./api.js";

export const createQuotesSrv = (quotesData) => {
  return api.post("/philosophy/quotes/create", quotesData);
};
export const getQuotesSrv = () => {
  return api.get("/philosophy/quotes/get");
};
export const getRandomQuoteSrv = () => {
  return api.get("/philosophy/quotes/random");
};
export const flushQuotesSrv = () => {
  return api.post("/philosophy/quotes/flush");
};
