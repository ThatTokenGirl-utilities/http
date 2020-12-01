import httpmethod_handler from "./+httpmethod_handler";

export const get = httpmethod_handler("GET");
export const post = httpmethod_handler("POST");
export const put = httpmethod_handler("PUT");
export const remove = httpmethod_handler("DELETE");
