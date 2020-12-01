import { HttpRequest, HttpResponse } from "../requests";

export type TestHandler = (req: HttpRequest) => Promise<HttpResponse> | null;
export type Transformer<TResult, TData = HttpRequest> = (
  data: TData
) => TResult;
export type DataHandler<TData> = (data: TData) => Promise<HttpResponse>;
