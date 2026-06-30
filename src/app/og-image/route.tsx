import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    // We would normally load fonts from an absolute URL or local array buffer.
    // Since we are running in Edge, we should fetch it or return the layout 
    // relying on system fonts if Geist isn't bundled. For the scope of this
    // programmatic OG image, we'll use standard sans-serif as a fallback.
    
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0c0c0e',
            color: 'white',
            fontFamily: 'sans-serif',
            position: 'relative',
          }}
        >
          {/* Top Left Badge */}
          <div
            style={{
              position: 'absolute',
              top: 40,
              left: 40,
              fontSize: 40,
              fontWeight: 800,
              letterSpacing: '-0.05em',
            }}
          >
            CUE
          </div>

          {/* Center Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 40,
            }}
          >
            <div
              style={{
                fontSize: 80,
                fontWeight: 800,
                letterSpacing: '-0.05em',
                lineHeight: 1.1,
                color: 'white',
              }}
            >
              Dev work.
            </div>
            <div
              style={{
                fontSize: 80,
                fontWeight: 800,
                letterSpacing: '-0.05em',
                lineHeight: 1.1,
                color: '#3b82f6',
              }}
            >
              Delivered in 48h.
            </div>
          </div>

          {/* Bottom Row */}
          <div
            style={{
              position: 'absolute',
              bottom: 40,
              display: 'flex',
              fontSize: 24,
              fontWeight: 500,
              color: '#888888',
              letterSpacing: '0.02em',
            }}
          >
            from $199/mo · Async · No meetings · cue.optimaai.eu
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
