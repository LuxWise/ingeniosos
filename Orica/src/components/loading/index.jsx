import { ThreeDots } from "react-loader-spinner";

const LoadingLogin = () => (
  <ThreeDots
    visible={true}
    height="70"
    width="70"
    color="#fff"
    radius="9"
    ariaLabel="three-dots-loading"
    wrapperStyle={{}}
    wrapperClass=""
  />
);

export const loading = { LoadingLogin };
