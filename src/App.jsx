import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'




import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Events from "./pages/Events";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {/* <Home /> */}
      <div className="min-h-screen bg-gray-50">
      <Events />
    </div>
      <Footer />
    </div>
  );
}

