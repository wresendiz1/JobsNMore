/* eslint-disable no-promise-executor-return */
import { lazy } from "react";

function FallBackDelay(path) {
  lazy(() =>
    Promise.all([
      import(path),
      new Promise((resolve) => setTimeout(resolve, 250)),
    ]).then(([moduleExports]) => moduleExports)
  );
}
export default FallBackDelay;
