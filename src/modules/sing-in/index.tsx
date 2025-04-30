import SingInForm from "./form";

const SingInOrSingUp = (props: {}) => (
  <div className="bg-primary h-screen w-screen flex-col sm:flex-row flex justify-end">
    <div className="bg-secondary w-screen h-4/10 flex  flex-col items-center justify-center sm:hidden rounded-b-4xl  gap-4">
      <img
        src="/image/notebook.png"
        alt=""
        className=" w-[171.46px] h-[131.62px]"
      />
      <img src="/image/logo.png" alt="" className=" w-[83px] h-[24px]" />
    </div>
    <div className=" sm:w-6/10  h-6/10 sm:h-screen flex items-center justify-center rounded-l-md ">
      <SingInForm />
    </div>
    <div className="bg-secondary w-4/10  sm:h-screen hidden sm:flex  flex-col items-center justify-center  sm:rounded-l-4xl gap-4">
      <img
        src="/image/notebook.png"
        alt=""
        className=" w-[299.61px] h-[230px]"
      />
      <img src="/image/logo.png" alt="" />
    </div>
  </div>
);

export default SingInOrSingUp;
