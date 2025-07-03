import { axiosInstance } from "./axiosInstance";

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  message: string;
  contact_id: number;
}

export const ContactAPIs = () => {
  const submitContact = async (contactData: ContactFormData) => {
    const response = await axiosInstance.post<ContactResponse>(
      "/contact/",
      contactData
    );
    console.log(response.data);
    return response.data;
  };

  return {
    submitContact,
  };
};
