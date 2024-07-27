import { Button } from "flowbite-react";
import heroimg from "../assets/hero-image.jpg";

function Hero() {
  return (
    <div
      style={{
        backgroundImage: `  linear-gradient(45deg,
                    rgba(29, 21, 21, 0.171),
                    rgba(8, 82, 156, 0.507)),url(${heroimg})`,
      }}
      className="h-[90vh] w-full -mt-1 bg-cover bg-center border-none  ">
      <div className="flex gap-10 flex-col  items-center justify-center h-full">
        <div className="w-[400px] md:w-[600px] ml-6 ">
          <div className=" text-4xl md:text-6xl pb-2 text-gray-400">
            Discover Your Next
          </div>
          <div className="text-5xl md:text-6xl mb-10 text-gray-400">
            Great Read
          </div>
          <p className="text-yellow-50">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Praesentium, omnis quisquam, cum eligendi quas sapiente dignissimos
            quae aliquid, odio accusantium velit ratione! Amet sed nisi a nobis
            aspernatur nostrum
          </p>
        </div>
        <Button size="xl" gradientDuoTone="purpleToPink" className="">
          Discover Books{" "}
        </Button>
      </div>
    </div>
  );
}

export default Hero;
