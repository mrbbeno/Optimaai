import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get('host') || '';

  // Ha a kérés a lab.optimaai.eu-ra jön
  if (hostname === 'lab.optimaai.eu') {
    if (url.pathname.startsWith('/google') && url.pathname.endsWith('.html')) {
      return NextResponse.next();
    }
    if (url.pathname.startsWith('/lab')) {
      url.pathname = url.pathname.replace(/^\/lab/, '') || '/';
      return NextResponse.redirect(url);
    }
    url.pathname = `/lab${url.pathname === '/' ? '' : url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // Ha a kérés a cue.optimaai.eu-ra jön
  if (hostname === 'cue.optimaai.eu') {
    if (url.pathname.startsWith('/google') && url.pathname.endsWith('.html')) {
      return NextResponse.next();
    }
    if (url.pathname.startsWith('/cue')) {
      url.pathname = url.pathname.replace(/^\/cue/, '') || '/';
      return NextResponse.redirect(url);
    }
    url.pathname = `/cue${url.pathname === '/' ? '' : url.pathname}`;
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
