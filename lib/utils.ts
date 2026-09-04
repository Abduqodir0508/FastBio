import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number | string): string {
  const numeric = typeof price === 'string' ? parseFloat(price) : price;
  if (isNaN(numeric)) return '0 UZS';
  return `${new Intl.NumberFormat('uz-UZ').format(numeric)} UZS`;
}

export function cleanTelegramUsername(username: string): string {
  if (!username) return '';
  return username.trim().replace(/^@+/, '').replace(/^https?:\/\/t\.me\//i, '');
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '_')           // Replace spaces with _
    .replace(/[^\w-]+/g, '')        // Remove all non-word chars except _ and -
    .replace(/__+/g, '_')           // Replace multiple _ with single _
    .replace(/^_+/, '')             // Trim _ from start of text
    .replace(/_+$/, '');            // Trim _ from end of text
}

export function buildTelegramOrderUrl(
  telegramUsername: string,
  productTitle: string,
  productPrice: number | string
): string {
  const cleanUsername = cleanTelegramUsername(telegramUsername);
  const formattedPrice = new Intl.NumberFormat('uz-UZ').format(
    typeof productPrice === 'string' ? parseFloat(productPrice) : productPrice
  );
  
  const message = `Assalomu alaykum, men ushbu mahsulotni buyurtma qilmoqchiman: ${productTitle} - ${formattedPrice} UZS`;
  const encodedMessage = encodeURIComponent(message);
  
  return `https://t.me/${cleanUsername}?text=${encodedMessage}`;
}

export function buildTelegramDirectUrl(telegramUsername: string): string {
  const cleanUsername = cleanTelegramUsername(telegramUsername);
  return `https://t.me/${cleanUsername}`;
}
