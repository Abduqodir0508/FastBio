import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/components/ThemeProvider';

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
    <html lang="uz" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const savedTheme = localStorage.getItem('theme');
                if (savedTheme === 'light') {
                  document.documentElement.classList.remove('dark');
                } else {
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {
                document.documentElement.classList.add('dark');
              }
            `,
          }}
        />
      </head>
      <body className="bg-white dark:bg-[#0B0C10] text-zinc-900 dark:text-zinc-100 min-h-screen antialiased selection:bg-rose-600 selection:text-white transition-colors duration-200">
        <ThemeProvider>
          {children}
          <Toaster position="bottom-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
