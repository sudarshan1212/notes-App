import GridLoader from "react-spinners/GridLoader";

const Loading = () => {
  return (
    <div className=" flex items-center justify-center w-full h-full">
      <GridLoader color="#36d7b7" />
    </div>
  );
};

export default Loading;
