'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFDocument from '@/components/PDFDocument';
import Image from 'next/image';

export default function PreviewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const formData = {
    name: searchParams.get('name') || '',
    email: searchParams.get('email') || '',
    phone: searchParams.get('phone') || '',
    position: searchParams.get('position') || '',
    description: searchParams.get('description') || '',
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className='flex justify-between items-center mb-6'>
        <button
          className="flex items-center gap-2 mb-6 text-gray-600 hover:text-black transition"
          onClick={() => router.push(`/?${searchParams.toString()}`)}
        >
          <Image
            src="/assets/chevron-left.svg"
            alt="Back"
            width={24}
            height={24}
            className="w-6 h-6"
          />
          <span>Back</span>
        </button>

        <h2 className="text-2xl font-bold text-center mb-6">PDF Preview</h2>
        <div></div>

      </div>
      <div className="bg-white border rounded-xl shadow-md p-6 overflow-y-auto space-y-4">
        <Detail label="Name" value={formData.name} />
        <Detail label="Email" value={formData.email} />
        <Detail label="Phone Number" value={formData.phone} />
        {searchParams.get('position') && (
          <Detail label="Position" value={formData.position} />
        )}
        {searchParams.get('description') &&
          <Detail label="Description" value={formData.description} multiline />
        }
      </div>

      <div className="flex gap-4 mt-6 w-full">
        <PDFDownloadLink
          document={<PDFDocument {...formData} />}
          fileName="details.pdf"
          className='flex-1 w-full'
        >
          {({ loading }) => (
            <button className="flex-1 bg-gradient-to-r from-[#569c76] to-[#3a6c4e] text-white font-semibold py-2 px-4 w-full rounded flex items-center justify-center gap-2">
              <Image
                src="/assets/Download.svg"
                alt="Download Icon"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              {loading ? 'Preparing PDF...' : 'Download PDF'}
            </button>
          )}
        </PDFDownloadLink>
      </div>
    </div>
  );
}

function Detail({
  label,
  value,
  multiline = false,
}: {
  label: string;
  value: string;
  multiline?: boolean;
}) {
  return (
    <div className="flex gap-4 items-start">
      <span className="font-semibold text-center min-w-[120px] w-full">{label}:</span>
      <span className={`text-gray-800 text-center w-full ${multiline ? 'whitespace-pre-wrap' : ''}`}>
        {value}
      </span>
    </div>
  );
}
