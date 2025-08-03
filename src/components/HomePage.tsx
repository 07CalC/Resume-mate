
'use client';
import { useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import FloatingLabelInput from '@/components/FloatingLableInput';
import { FormData } from '@/types/formData';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFDocument from '@/components/PDFDocument';
import Image from 'next/image';

export default function HomePageComponent() {
  const searchParams = useSearchParams();

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      name: searchParams.get('name') || '',
      email: searchParams.get('email') || '',
      phone: searchParams.get('phone') || '',
      position: searchParams.get('position') || '',
      description: searchParams.get('description') || '',
    },
  });

  const router = useRouter();
  const data = watch();


  const onSubmit = (data: FormData) => {
    const query = new URLSearchParams(data as any).toString();
    router.push(`/preview?${query}`);
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold text-center mb-6">Add Your details</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FloatingLabelInput
          label="Name"
          example="e.g. John Doe"
          valueInit={searchParams.get('name') || ''}
          register={register('name', { required: true })}
          icon="/assets/user.svg"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">Name is required</p>}

        <FloatingLabelInput
          label="Email"
          type='email'
          valueInit={searchParams.get('email') || ''}
          example="e.g. johndoe@gmail.com"
          icon="/assets/mail.svg"
          register={register('email', {
            required: true,
            pattern: /^\S+@\S+$/i,
          })}
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">Valid email is required</p>}

        <FloatingLabelInput
          label="Phone Number"
          type="tel"
          valueInit={searchParams.get('phone') || ''}
          example="e.g. (220) 222 -20002"
          icon="/assets/phone-call.svg"
          register={register('phone', { required: true, minLength: 10 })}
        />
        {errors.phone && <p className="text-red-500 text-sm mt-1">Phone must be at least 10 digits</p>}

        <FloatingLabelInput
          label="Position"
          icon="/assets/position.svg"
          example="e.g. Junior Front end Developer"
          valueInit={searchParams.get('position') || ''}
          register={register('position')}
        />

        <FloatingLabelInput
          label="Description"
          example="e.g. Work experiences"
          icon="/assets/Description.svg"
          valueInit={searchParams.get('description') || ''}
          isTextArea
          register={register('description')}
        />

        <div className="flex gap-4 mt-6 w-full">
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-[#569c76] to-[#3a6c4e] text-white py-3 rounded-xl font-medium shadow-md hover:opacity-90 w-1/2"
          >
            View PDF
          </button>

          <PDFDownloadLink document={<PDFDocument {...data} />} fileName="details.pdf" className='w-1/2'>
            {({ loading }) => (
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 flex-1 bg-gradient-to-r from-[#569c76] to-[#3a6c4e] text-white py-3 rounded-xl font-medium shadow-md hover:opacity-90"
              >
                <Image
                  src="/assets/Download.svg"
                  alt="Download Icon"
                  width={24}
                  height={24}
                />

                {loading ? 'Preparing...' : 'Download PDF'}
              </button>
            )}
          </PDFDownloadLink>
        </div>
      </form>
    </div>
  );
}
