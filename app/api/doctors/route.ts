import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Doctor, { IDoctor } from '@/models/Doctor';

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const doctor = await Doctor.create(body);
    return NextResponse.json(doctor, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Something went wrong' },
      { status: 400 }
    );
  }
}

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const specialization = searchParams.get('specialization');
    const experience = searchParams.get('experience');
    const rating = searchParams.get('rating');
    const location = searchParams.get('location');

    const query: Record<string, any> = {};

    if (specialization) {
      query.specialization = specialization;
    }
    if (experience) {
      query.experience = { $gte: parseInt(experience) };
    }
    if (rating) {
      query.rating = { $gte: parseFloat(rating) };
    }
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    const doctors = await Doctor.find(query)
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();

    const count = await Doctor.countDocuments(query);

    return NextResponse.json({
      doctors,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalDoctors: count,
    });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Something went wrong' },
      { status: 500 }
    );
  }
} 