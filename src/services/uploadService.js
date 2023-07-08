import { errorHandler, successHandler } from "../common/appHandler";
import axiosInstance from "../common/axiosInstance";

class UploadService {
  static uploadPortFolioData = async (data) => {
    try {
      const res = await axiosInstance.post(
        "transection-data/transections-data",
        data
      );

      return successHandler(res);
    } catch (error) {
      return errorHandler(error);
    }
  };

  static uploadCashflowData = async (data) => {
    try {
      const res = await axiosInstance.post("cash-flow/cash-flow", data);

      return successHandler(res);
    } catch (error) {
      return errorHandler(error);
    }
  };

  static uploadMarketData = async (data) => {
    try {
      const res = await axiosInstance.post("closing-price/closing-price", data);

      return successHandler(res);
    } catch (error) {
      return errorHandler(error);
    }
  };

  static uploadCorporateData = async (data) => {
    try {
      const res = await axiosInstance.post(
        "corporate-action/corporate-action",
        data
      );

      return successHandler(res);
    } catch (error) {
      return errorHandler(error);
    }
  };
}

export default UploadService;
