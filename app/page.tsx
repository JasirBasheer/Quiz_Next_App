import Image from "next/image";
import DropDown from "./ui/DropDown"
import hero from '../public/images/hero.png'

export default async function Home() {
  const response = await fetch('http://localhost:4000/get-categories');
  if (!response.ok) throw new Error('Failed to fetch categories');
  const { categories } = await response.json();

  return (
    <>
      <div className="w-full grid grid-cols-10 h-[41.6rem] bg-[#43766C] ">
          <div className="col-span-5 flex items-end justify-end">
            <Image src={hero} width={1000} height={50} alt="hero"/>
          </div>
          <div className="col-span-5  flex items-center">
            <div className="">
            <h1 className="text-[3rem] font-semibold">Lets have some quick quiz</h1>
          <DropDown categories={categories}/>

            </div>

          </div>
      </div>
    </>
  )
}
