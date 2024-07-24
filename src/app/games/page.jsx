import Header from "@/components/ui/Header";
import BackButton from "@/components/ui/BackButton";
import { IoIosArrowDown } from "react-icons/io";

export default function Page() {
  return (
    <div>
      <Header />
      <main>
        <BackButton />
        <div className="px-8  ">
          <h1 className="font-koulen text-grey text-3xl">QUIZ AND GAMES</h1>
          <div className="flex justify-between pt-5">
            <div className="">
              <h1 className="text-2xl font-semibold">Hi User!..</h1>
              <h3>Good to see you again</h3>
            </div>
            <div className="">
              <img src="/person.png" alt="" className="opacity-70" />
            </div>
          </div>
          <div className="p-5 rounded-xl shadow-md mt-5 grid gap-3 bg-orange-100/50">
            <h1 className="font-koulen text-grey text-3xl">SCORE</h1>
            <div className="flex justify-between">
              <div className="">
                <h1>Total Score :</h1>
              </div>
              <div className="">
                <h1>785</h1>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="">
                <h1>Today Score :</h1>
              </div>
              <div className="">
                <h1>25</h1>
              </div>
            </div>
          </div>
          <div className="py-5">
            <h1 className="font-semibold text-2xl">Daily Quiz</h1>
            <div className="bg-orange-100 rounded-xl flex mt-3">
              <div className="">
                <img src="/quiz.png" alt="" className="h-32 w-32" />
              </div>
              <div className="p-3 grid grid-cols-3 w-full">
                <div className="col-span-2 flex flex-col justify-around">
                  <h1>20 Questions</h1>
                  <h1>40 Points</h1>
                  <h1>20 Minutes</h1>
                </div>
                <div className="bg-white shadow-inner rounded-xl flex items-center justify-center">
                  <h1>Start</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="py-5">
            <h1 className="text-2xl">Rewards Collected</h1>
            <div className="flex justify-center pt-5">
              <div
                className="w-full h-40 bg-no-repeat bg-contain"
                style={{ backgroundImage: `url(/coupon.png)` }}
              >
                <div className="grid grid-cols-2 h-full px-5 gap-5">
                  <div className="flex justify-center items-center h-full">
                    <h1 className="font-serif text-4xl text-red-400">LUXNUT</h1>
                  </div>
                  <div className="flex justify-center items-center h-full">
                    <div className="">
                      <h1 className="font-semibold text-2xl">50% OFF</h1>
                      <h3>on orders above 2999</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center pt-3">
              <div className="flex gap-2 items-center border-2 rounded-xl px-3 py-1">
                <h1>See all Rewards</h1>
                <IoIosArrowDown />
              </div>
            </div>
          </div>
          <div className="">
            <h1 className="text-2xl font-semibold">Refer Your Friend</h1>
            <h5>Refer a friend to play and double your points rewards</h5>
            <div className="px-5 py-5">
                <div className="grid grid-cols-3 rounded-xl">
                    <div className="col-span-2 bg-gray-200 p-3 text-center rounded-l-md">
                        <h1>xttydh62</h1>
                    </div>
                    <div className="bg-red-400 text-white p-3 text-center rounded-r-md">
                        <h1>Share</h1>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
