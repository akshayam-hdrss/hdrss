import Header from "@/components/ui/Header";
import BackButton from "@/components/ui/BackButton";
import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";
export default function Page() {
  return (
    <>
      <Header />
      <h1 className="font-koulen text-4xl text-grey mt-14 ml-4">
        Quiz and Games
      </h1>
      <div className="flex mx-auto w-fit my-10 items-start justify-evenly bg-[#f8eae3] pr-6 py-6 rounded-md cursor-pointer hover:scale-110 hover:drop-shadow-2xl transition-all ">
        <img src="/sudoku.png" alt="sudoku" width={250} height={250} />
        <div>
          <h1 className="text-3xl font-bold mt-6 mb-1">Sudoku</h1>
          <h2 className="text-lg mb-6">Challenge your mind, Master the Grid</h2>
          <Link
            href={"/games/sudoku"}
            className="bg-kaavi text-white px-4 py-2 rounded-md "
          >
            Play now
          </Link>
        </div>
      </div>
    </>
  );
}
