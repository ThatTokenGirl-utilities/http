import { TestHandler } from "../+types";
import decoratorFactory from "./+decoratorFactory";

const delay = decoratorFactory((res, ms: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(res);
    }, ms);
  });
});

export default delay;
