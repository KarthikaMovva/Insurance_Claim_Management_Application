import api from "./api";

export const getMyClaims = async () => {

    const response =
        await api.get("/claims/my");

    return response.data.claims;

};

export const submitClaim = async (formData) => {
    const response = await api.post("/claims", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });

    return response.data;
};

export const getAllClaims = async (filters = {}) => {

    const response = await api.get("/claims", {
        params: filters
    });

    return response.data.claims;

};

export const getClaimById = async (id) => {

    const response =
        await api.get(`/claims/${id}`);

    return response.data.claim;

};

export const updateClaim = async (id, data) => {

    const response = await api.patch(`/claims/${id}`, data);

    return response.data;

};