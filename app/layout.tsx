import { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Find General Physicians & Internal Medicine Doctors | Apollo 247',
  description: 'Book appointments with the best General Physicians & Internal Medicine Doctors near you. View doctor profiles, ratings, experience, and book online consultations.',
  keywords: 'General Physician, Internal Medicine, Doctor Appointment, Online Consultation, Healthcare',
  openGraph: {
    title: 'Find General Physicians & Internal Medicine Doctors | Apollo 247',
    description: 'Book appointments with the best General Physicians & Internal Medicine Doctors near you.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
