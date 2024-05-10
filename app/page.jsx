"use client"
import Section from "./components/Section";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
export default function Home() {
  const { data: session } = useSession();
  console.log(session);

  return (
    <main >
      
      <Navbar session={session}/>
   
      <Section></Section>
         
      <Footer></Footer>
    </main>
  
  );
}
