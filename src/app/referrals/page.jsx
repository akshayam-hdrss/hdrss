import Header from "@/components/ui/Header";
import BackButton from "@/components/ui/BackButton";
export default function Page() {
  return (
    <div>
      <Header />
      <main>
        <BackButton route="/" />
        <div className="px-10">
          <div className="flex justify-center">
            <img src="/refer.png" alt="" className="w-[200px]" />
          </div>
          <div className="py-5 grid gap-3">
            <h1 className="font-koulen text-grey text-3xl text-center">
              REFER & EARN
            </h1>
            <h3>
              Share this code with your friend while signing up and you both
              will get bonus offers.
            </h3>
            <div className="px-5 py-5">
                <div className="grid grid-cols-3 rounded-xl">
                    <div className="col-span-2 bg-gray-200 p-3 text-center rounded-l-md">
                        <h1>xttydh62</h1>
                    </div>
                    <div className="bg-red-400 text-white p-3 text-center rounded-r-md">
                        <h1>Share</h1>
                    </div>
                </div>
                <div className="flex justify-around pt-10">
                    <div className="">
                        <img src="/wplogo.png" alt="" className="w-[40px]" />
                    </div>
                    <div className="">
                        <img src="/fblogo.png" alt="" className="w-[40px]" />
                    </div>
                    <div className="">
                        <img src="/inlogo.png" alt="" className="w-[40px]" />
                    </div>
                </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
