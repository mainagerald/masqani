import axiosInstance from "../../utils/http/AxiosInstance";
import { generateIdempotencyKey } from "../../utils/idm/idempotency";
import { environment } from "../environment/environment";

export const createPropertyListing = async (formData, files) => {
  const formDataObj = new FormData();
  files.forEach((file) => {
    formDataObj.append("files", file);
  });

  const dto = {
    ...formData,
    // idempotencyKey: generateIdempotencyKey(),
  };

  formDataObj.append("dto", JSON.stringify(dto));

  for (let pair of formDataObj.entries()) {
    console.log(`${pair[0]}: ${pair[1]}`);
  }  
  try {
      const response = await axiosInstance.post(`${environment.apiUrl}/landlord-listing/create`, formDataObj);
      
      return response.data;
  } catch (error) {
      console.error('Error creating property listing:', error.response || error);
      throw new Error(error.response?.data?.message || "Submission failed");
  }
};