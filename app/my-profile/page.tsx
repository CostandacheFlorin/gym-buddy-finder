import Image from "next/image";

export default function MyProfile() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-[#FFF5E1] ">
      <div className="p-8 m-8 min-w-[800px] min-h-screen flex flex-col content-center gap-3 ">
        <h1 className="text-center text-[#0C1844] text-xl font-bold">
          My profile
        </h1>

        <div className="w-full flex items-center justify-center">
          <div className="w-[400px] h-[600px] bg-black"></div>
        </div>

        <div className="w-full flex justify-center flex-col ">
          <h2 className="text-black font-bold">Description</h2>
          <textarea cols={10} rows={10}></textarea>
        </div>

        <div className="w-full flex justify-center flex-col ">
          <h2 className="text-black font-bold">Gym related interests </h2>
        </div>

        <div className="w-full flex justify-center flex-col ">
          <h2 className="text-black font-bold">Gym unrelated interests </h2>
        </div>
      </div>
    </main>
  );
}
