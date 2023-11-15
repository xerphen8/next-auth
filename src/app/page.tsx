"use client"
import { NavBar } from "@/components/NavBar";

const Home = ({children}) => {
  return (
    <main className='h-screen min-h-screen justify-center items-center'>
      <NavBar />
      {children}
    </main>
  )
}

export default Home;