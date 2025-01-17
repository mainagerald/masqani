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

  try {
      const response = await axiosInstance.post(`${environment.apiUrl}/landlord-listing/create`, formDataObj);
      return response.data;
  } catch (error) {
      console.error('Error creating property listing:', error.response || error);
      throw new Error(error.response?.data?.message || "Submission failed");
  }
};

export const getLandlordProperties = async ()=>{
  try {
    const response = await axiosInstance.get(`${environment.apiUrl}/landlord-listing/get-all`,{})
    return response.data
  } catch (error) {
    console.error(error);
    throw new Error(error?.response?.message || "Get properties failed. Please try again. ")
  }
}

export const deleteLandlordProperty = async(listingPublicId)=>{
  try {
    const response = await axiosInstance.delete(`${environment.apiUrl}/landlord-listing/delete/${listingPublicId}`);
    return response;
  } catch (error) {
    
  }
}