import Image from "next/image";
import logo from '../../public/images/logo.png'

export default function NavBar(){
    return (
        <div className="w-full h-[5rem] bg-[#ffffff] flex items-center pl-8 gap-3">
            <Image src={logo} width={50} height={50} alt="logo" />
             <h2 className="text-black font-extrabold text-xl">QUIZ APP</h2>
        </div>
    )
}