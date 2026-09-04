import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');
const filePath = path.join(dataDir, 'appointments.json');

function getAppointments() {
  if (!fs.existsSync(filePath)) {
    return [];
  }
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch {
    return [];
  }
}

function saveAppointments(appointments: unknown[]) {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  fs.writeFileSync(filePath, JSON.stringify(appointments, null, 2), 'utf-8');
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, service, preferredDate, preferredTime, message } = body;

    if (!fullName || !email || !phone || !service || !preferredDate || !preferredTime) {
      return NextResponse.json(
        { error: 'Missing required booking fields' },
        { status: 400 }
      );
    }

    const newAppointment = {
      id: `APT-${Date.now()}`,
      fullName,
      email,
      phone,
      service,
      preferredDate,
      preferredTime,
      message: message || '',
      createdAt: new Date().toISOString(),
      status: 'pending', // pending | confirmed | completed | cancelled
    };

    const appointments = getAppointments();
    appointments.unshift(newAppointment);
    saveAppointments(appointments);

    console.log('-------------------------------------------');
    console.log('🦷 NEW APPOINTMENT BOOKED (WE MAKE SMILES):');
    console.log(`👤 Name: ${fullName}`);
    console.log(`📧 Email: ${email}`);
    console.log(`📞 Phone: ${phone}`);
    console.log(`✨ Service: ${service}`);
    console.log(`📅 Date & Time: ${preferredDate} at ${preferredTime}`);
    if (message) console.log(`📝 Notes: ${message}`);
    console.log('-------------------------------------------');

    return NextResponse.json({
      success: true,
      message: "Thank you! We'll contact you soon",
      appointment: newAppointment,
    });
  } catch (error) {
    console.error('Error saving appointment:', error);
    return NextResponse.json(
      { error: 'Internal server error processing appointment' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const appointments = getAppointments();
    return NextResponse.json({ appointments });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch appointments' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: 'Missing id or status' }, { status: 400 });
    }

    const appointments = getAppointments();
    const index = appointments.findIndex((apt: { id: string }) => apt.id === id);

    if (index === -1) {
      return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
    }

    appointments[index].status = status;
    saveAppointments(appointments);

    return NextResponse.json({ success: true, appointment: appointments[index] });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update appointment' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing appointment id' }, { status: 400 });
    }

    let appointments = getAppointments();
    appointments = appointments.filter((apt: { id: string }) => apt.id !== id);
    saveAppointments(appointments);

    return NextResponse.json({ success: true, message: 'Appointment deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete appointment' }, { status: 500 });
  }
}
