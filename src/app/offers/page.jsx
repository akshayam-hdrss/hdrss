import Header from "@/components/ui/Header";
import BackButton from "@/components/ui/BackButton";
export default function Page() {
  return (
    <div>
      <Header />
      <main>
        <BackButton />
        <div className="px-8">
          <h1 className="font-koulen text-grey text-3xl">REWARD COUPONS</h1>
          <div className="grid gap-2 pt-5">
            <div className="flex justify-center">
              <div
                className="w-full h-40 bg-no-repeat bg-contain"
                style={{ backgroundImage: `url(/coupon.png)` }}
              >
                <div className="grid grid-cols-2 h-full px-5 gap-5">
                  <div className="flex justify-center items-center h-full">
                    {/* <h1 className="font-serif text-4xl text-red-400">LUXNUT</h1> */}
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
            <div className="flex justify-center">
              <div
                className="w-full h-40 bg-no-repeat bg-contain"
                style={{ backgroundImage: `url(/coupon.png)` }}
              >
                <div className="grid grid-cols-2 h-full px-5 gap-5">
                  <div className="flex justify-center items-center h-full">
                    {/* <h1 className="font-serif text-4xl text-red-400">LUXNUT</h1> */}
                  </div>
                  <div className="flex justify-center items-center h-full">
                    <div className="">
                      <h1 className="font-semibold text-2xl">70% OFF</h1>
                      <h3>on orders above 2999</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div
                className="w-full h-40 bg-no-repeat bg-contain"
                style={{ backgroundImage: `url(/coupon.png)` }}
              >
                <div className="grid grid-cols-2 h-full px-5 gap-5">
                  <div className="flex justify-center items-center h-full">
                    {/* <h1 className="font-serif text-4xl text-red-400">LUXNUT</h1> */}
                  </div>
                  <div className="flex justify-center items-center h-full">
                    <div className="">
                      <h1 className="font-semibold text-2xl">15% OFF</h1>
                      <h3>on orders above 2999</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="">
                <div
                  className="w-full h-40 bg-no-repeat bg-contain bg-white"
                  style={{ backgroundImage: `url(/coupon2.png)` }}
                >
                  <div className="grid grid-cols-2 h-full px-5 gap-5 opacity-30">
                    <div className="flex justify-center items-center h-full">
                      {/* <h1 className="font-serif text-4xl text-red-400">
                        LUXNUT
                      </h1> */}
                    </div>
                    <div className="flex justify-center items-center h-full">
                      <div className="">
                        <h1 className="font-semibold text-2xl">50% OFF</h1>
                        <h3>on orders above 2999</h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-[-100px]">
                  <div className="flex justify-center">
                    <h1 className="font-serif text-5xl text-red-400">
                      EXPIRED
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t-2 p-5 pt-8 pb-20 mt-[80px] border-black flex justify-center">
            <h1 className="border rounded-xl px-8 py-2 text-xl border-black text-center">Collect More</h1>
          </div>
        </div>
      </main>
    </div>
  );
}
