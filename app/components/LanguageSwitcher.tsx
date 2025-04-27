
/// Use this component in the layout.
'use client';

import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();

  const handleChange = (newLocale: string) => {
    router.push(`/${newLocale}`);
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => handleChange('en')}
        className={`px-4 py-2 ${locale === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        English
      </button>
      <button
        onClick={() => handleChange('fa')}
        className={`px-4 py-2 ${locale === 'fa' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        فارسی
      </button>
      <button
        onClick={() => handleChange('ar')}
        className={`px-4 py-2 ${locale === 'ar' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        العربية
      </button>
    </div>
  );
}