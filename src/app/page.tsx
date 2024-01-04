"use client"

import { NavBar } from "@/components/NavBar";
import { Banner } from "@/components/Banner";
import { ChatBar } from "@/components/ChatBar";
import { SideBar } from "@/components/SideBar";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core"; 
config.autoAddCss = false;

const Home = () => {
  return (
    <main className='h-screen min-h-screen justify-center items-center'>
      <div className="flex w-full h-screen">
        <SideBar />
        <div className="w-[77%] h-full overflow-x-hidden">
          <NavBar />
          <Banner />
        </div>
      </div>
    </main>
  )
}

export default Home;