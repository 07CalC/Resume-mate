import PreivewComponent from '@/components/PreviewPage';
import { Suspense } from 'react';

export default function PreviewPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
      <PreivewComponent />
    </Suspense>

  )
}

