import APIPaymentService from "./PaymentServices";
import { GET } from "../../constants/HTTPConstants";

export const getBillHistory = () => {
  return APIPaymentService.makeAuthRequest({
    method: GET,
    url: "/bills",
  });
};

export const exportAffiliate = () => {
  return APIPaymentService.makeAuthRequest({
    method: GET,
    url: "/export/affiliate",
  });
};

export const getAffiliate = (page = 1, limit = 10) => {
  return APIPaymentService.makeAuthRequest({
    method: GET,
    url: "/affiliate",
    params: {
      page,
      limit,
    },
  });
};
