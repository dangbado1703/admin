import { Suspense } from "react";

const Loadable = (Component: any) => (props: any) =>
  (
    <Suspense fallback={<Loading />}>
      <Component {...props} />
    </Suspense>
  );

import { Spin } from "antd";

const Loading = () => (
  <div
    style={{
      position: "fixed",
      top: "50%",
      left: "50%",
    }}
  >
    <Spin size="large" />
  </div>
);
export default Loadable;
