import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get('host') || '';

  // Ha a kérés a lab.optimaai.eu-ra jön
  if (hostname === 'lab.optimaai.eu') {
    // Biztonsági ellenőrzés: ha az útvonal valamiért már tartalmazza a /lab-ot,
    // (pl. egy kódban maradt /lab/... link miatt), akkor redirecteljük a tiszta URL-re.
    if (url.pathname.startsWith('/lab')) {
      url.pathname = url.pathname.replace(/^\/lab/, '') || '/';
      return NextResponse.redirect(url);
    }
    
    // A háttérben átdobjuk a kérést a /lab almappára
    url.pathname = `/lab${url.pathname === '/' ? '' : url.pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Csak a releváns oldalakra fusson le, statikus fájlokra, képekre ne
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|webp)$).*)',
  ],
};
