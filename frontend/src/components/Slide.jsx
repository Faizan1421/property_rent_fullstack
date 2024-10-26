const Slide = () => {
  return (
    <div
      className="hidden laptop:block  laptop:w-full overflow-hidden laptop:h-[80vh] bg-gradient-to-b from-black via-black to-black bg-opacity-50 laptop:bg-cover  bg-no-repeat bg-center "
      style={{ backgroundImage: "url(https://res.cloudinary.com/dzxywksdm/image/upload/t_optimized%20banner/v1729926256/slide_t2ytyn.jpg)" }}
    >
      <h1 className="px-[30px] py-[30px] sm:px-[20px] laptop:pt-[50px] desktop:pt-[50px] text-[15px] laptop:text-[40px] text-center text-[white]">
        Welcome Home! Anywhere you roam <br /> Stay in the moment. Make your
        memories
      </h1>
    </div>
  );
};

export default Slide;
