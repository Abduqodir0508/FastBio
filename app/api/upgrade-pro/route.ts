import { NextRequest, NextResponse } from 'next/server';
import { upgradeShopToPro, getShopBySlug } from '@/lib/storage';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { slug, is_pro = true, custom_limit, secret_key } = body;

    // Optional simple security check
    const BOT_SECRET = process.env.BOT_SECRET_KEY || 'fastbio_pro_bot_secret_2026';
    if (secret_key && secret_key !== BOT_SECRET) {
      return NextResponse.json({ error: 'Ruxsat berilmadi' }, { status: 403 });
    }

    if (!slug) {
      return NextResponse.json({ error: "Do'kon manzili (slug) kiritilmadi" }, { status: 400 });
    }

    const shop = await getShopBySlug(slug);
    if (!shop) {
      return NextResponse.json({ error: "Do'kon topilmadi" }, { status: 404 });
    }

    const res = await upgradeShopToPro(slug, is_pro, custom_limit);
    if (!res.success) {
      return NextResponse.json({ error: res.error || "Yangilashda xatolik" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: `Do'kon muvaffaqiyatli PRO tarifiga o'tkazildi!`,
      shop: res.shop,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Server xatosi' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');

  if (!slug) {
    return NextResponse.json({ error: 'Slug talab qilinadi' }, { status: 400 });
  }

  const shop = await getShopBySlug(slug);
  if (!shop) {
    return NextResponse.json({ error: "Do'kon topilmadi" }, { status: 404 });
  }

  return NextResponse.json({
    shop: {
      id: shop.id,
      name: shop.name,
      slug: shop.slug,
      is_pro: Boolean(shop.is_pro),
      custom_limit: shop.custom_limit,
    },
  });
}
