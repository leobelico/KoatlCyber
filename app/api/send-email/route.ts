import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validación básica
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    // Configuración del transporter (usa variables de entorno)
    const transporter = nodemailer.createTransport({
      host: 'mail.privateemail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      },
      tls: {
        rejectUnauthorized: false // Solo para desarrollo
      }
    });

    // Construir el asunto basado en el tipo de solicitud
    const subject = body.subject || `Nueva solicitud de ${body.name}`;

    // Enviar el correo
    await transporter.sendMail({
      from: `"Koatl Cyber" <${process.env.EMAIL_USER}>`,
      to: process.env.NEXT_PUBLIC_EMAIL_TO || 'ventas@koatlcyber.com',
      subject: subject,
      html: `
        <h2>Nueva solicitud recibida</h2>
        <p><strong>Nombre:</strong> ${body.name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Teléfono:</strong> ${body.phone || 'No proporcionado'}</p>
        ${body.service ? `<p><strong>Servicio:</strong> ${body.service}</p>` : ''}
        <p><strong>Mensaje:</strong></p>
        <p>${body.message.replace(/\n/g, '<br>')}</p>
      `
    });

    return NextResponse.json(
      { success: true, message: 'Correo enviado correctamente' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error al enviar el correo:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}