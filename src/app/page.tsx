import HomePageComponent from '@/components/HomePage';
import { Suspense } from 'react';

export default function HomePage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
      <HomePageComponent />
    </Suspense>
  )

}

