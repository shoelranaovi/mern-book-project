import { Spinner } from "flowbite-react";

function Loder() {
  return (
    <div className="w-full flex justify-center items-center p-4">
      <Spinner
        color="success"
        className=""
        aria-label="Extra large spinner example"
        size="xl"
      />
    </div>
  );
}

export default Loder;
