// src/layouts/MainLayout.tsx
import { Outlet } from 'react-router-dom';
import { Footer } from '@/layouts/Footer';
import { Navbar } from '@/layouts/Navbar';


export const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};