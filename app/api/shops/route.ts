import { NextRequest, NextResponse } from 'next/server';
import { createShop, getShopBySlug } from '@/lib/storage';

// POST /api/shops - Yangi do'kon yaratish
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, slug, telegram_username, admin_pin } = body;

    console.log('[API POST /api/shops] So\'rov qabul qilindi:', { name, slug, telegram_username });

    if (!name || !slug || !telegram_username || !admin_pin) {
      return NextResponse.json(
        { error: 'Barcha maydonlar (nom, manzil, telegram, pin) to\'ldirilishi shart' },
        { status: 400 }
      );
    }

    const res = await createShop({
      name: String(name).trim(),
      slug: String(slug).trim(),
      telegram_username: String(telegram_username).trim(),
      admin_pin: String(admin_pin).trim(),
    });

    if (res.error || !res.shop) {
      console.error('[API POST /api/shops] Xatolik:', res.error);
      return NextResponse.json(
        { error: res.error || "Do'kon yaratishda xatolik" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: true, shop: res.shop },
      { status: 201 }
    );
  } catch (err: any) {
    console.error('[API POST /api/shops] Server xatosi:', err);
    return NextResponse.json(
      { error: err?.message || 'Server xatosi yuz berdi' },
      { status: 500 }
    );
  }
}

// GET /api/shops?slug=... - Do'kon ma'lumotlarini olish
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json(
        { error: 'Do\'kon manzili (slug) parametri talab qilinadi' },
        { status: 400 }
      );
    }

    const shop = await getShopBySlug(slug);
    if (!shop) {
      return NextResponse.json(
        { error: "Do'kon topilmadi" },
        { status: 404 }
      );
    }

    return NextResponse.json({ shop });
  } catch (err: any) {
    console.error('[API GET /api/shops] Server xatosi:', err);
    return NextResponse.json(
      { error: err?.message || 'Server xatosi yuz berdi' },
      { status: 500 }
    );
  }
}
