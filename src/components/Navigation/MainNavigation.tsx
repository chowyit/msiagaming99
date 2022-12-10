import SearchBar from "./SearchBar";

const MainNavigation = () => {
  return (
    <div className="h-[88px] bg-white flex gap-10 flex-row w-full justify-between px-5 align-middle items-center">
      <div className="flex">logo here</div>
      <div className="flex flex-row gap-10">
        <div className="flex">Local Games</div>
        <div className="flex">Website Games</div>
        <div className="flex">Mobile Games</div>
        <div className="flex">Perfect Time Space</div>
        <div className="flex">Mobile Games Server</div>
      </div>
      <div className="flex">
        <SearchBar />
      </div>
    </div>
  );
};

export default MainNavigation;
