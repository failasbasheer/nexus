import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Nexus - Next Gen SaaS',
    description: 'Next generation SaaS platform',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${inter.className} min-h-screen bg-dark text-primary selection:bg-accent-primary selection:text-white flex flex-col`}>
                <Navbar />
                <main className="flex-grow">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
