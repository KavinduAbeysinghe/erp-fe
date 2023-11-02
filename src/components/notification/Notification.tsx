import { Slide, ToastContainer } from "react-toastify";

export const Notification = () => {
  return (
    <ToastContainer
      toastStyle={{ fontSize: "0.9em", padding: 12 }}
      autoClose={1500}
      closeButton={false}
      newestOnTop={true}
      closeOnClick={true}
      transition={Slide}
      theme={"light"}
    />
  );
};
