import { generateIdempotencyKey } from "../../utils/idm/idempotency";

export const createPropertyListing = async (formData, files) => {
    const formDataObj = new FormData();
    files.forEach((file) => {
      formDataObj.append("files", file);
    });
  
    const dto = {
      ...formData,
      idempotencyKey: generateIdempotencyKey(),
    };
  
    formDataObj.append("dto", JSON.stringify(dto));
  
    const response = await fetch("http://localhost:9090/api/landlord-listing/create", {
      method: "POST",
      body: formDataObj,
    });
  
    if (!response.ok) {
      throw new Error("Submission failed");
    }
  
    return response.json();
  };