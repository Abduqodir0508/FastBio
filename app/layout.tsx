import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'InstaLink - Multi-Tenant E-Commerce Link-in-Bio for Instagram & Telegram',
  description: 'InstaLink orqali Instagram va Telegram do\'koningiz uchun 1 daqiqada zamonaviy Link-in-Bio katalog oching va buyurtmalarni Telegramda qabul qiling.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" className="dark">
      <body className="bg-[#090D16] text-slate-100 min-h-screen antialiased selection:bg-indigo-500 selection:text-white">
        {children}
        <Toaster position="bottom-right" richColors theme="dark" />
      </body>
    </html>
  );
}
