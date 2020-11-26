import { retry } from "..";
import { httpClientFactory, HttpResponse } from "../../requests";

describe("middleware: retry", () => {
  test("error is throw after every attempt as been made", async () => {
    const client = httpClientFactory(
      jest.fn().mockRejectedValue("error message"),
      retry(10)
    );

    await expect(
      client.request({ url: "request", method: "POST" })
    ).rejects.toThrowError("Request failed after 10 attempts: error message");
  });

  test("retry is performed for every failure", async () => {
    const response: HttpResponse = {
      url: "response_url",
      status: 200,
      headers: {},
    };
    const requester = jest
      .fn()
      .mockRejectedValueOnce("error 1")
      .mockRejectedValueOnce("error 2")
      .mockRejectedValueOnce("error 3")
      .mockRejectedValueOnce("error 4")
      .mockReturnValueOnce(response);

    const client = httpClientFactory(requester, retry(10));

    const result = await client.request({ url: "request", method: "POST" });

    expect(response).toEqual(result);
    expect(requester).toHaveBeenCalledTimes(5);
  });
});
