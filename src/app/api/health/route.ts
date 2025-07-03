import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Aquí podrías agregar verificaciones adicionales
    // como conexión a la base de datos, servicios externos, etc.
    const healthcheck = {
      uptime: process.uptime(),
      message: 'OK',
      timestamp: Date.now()
    };

    return NextResponse.json(healthcheck, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { 
        message: 'Error',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 503 }
    );
  }
} 