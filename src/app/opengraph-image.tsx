import { ImageResponse } from 'next/og';

export const dynamic = 'force-static'; // Required for static export



export const alt = 'Hareram Kushwaha - Personal Portfolio';
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: 'linear-gradient(to bottom right, #000000, #111111)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'sans-serif',
                    color: 'white',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid #333',
                        borderRadius: '20px',
                        padding: '40px 80px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        boxShadow: '0 0 50px -12px rgba(0, 0, 0, 0.5)',
                    }}
                >
                    <h1
                        style={{
                            fontSize: 80,
                            fontWeight: 900,
                            margin: '0 0 20px 0',
                            background: 'linear-gradient(to right, #ffffff, #888888)',
                            backgroundClip: 'text',
                            color: 'transparent',
                        }}
                    >
                        Hareram Kushwaha
                    </h1>
                    <p
                        style={{
                            fontSize: 45,
                            margin: 0,
                            color: '#888',
                            textAlign: 'center',
                            lineHeight: 1.5,
                        }}
                    >
                        CS Student | Full-Stack Developer | Problem Solver
                    </p>
                    <div
                        style={{
                            display: 'flex',
                            marginTop: 40,
                            gap: 20,
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', fontSize: 24, color: '#ccc' }}>
                            Full-Stack Development
                        </div>
                        <div style={{ width: 1, height: 30, background: '#444' }} />
                        <div style={{ display: 'flex', alignItems: 'center', fontSize: 24, color: '#ccc' }}>
                            System Architecture
                        </div>
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
