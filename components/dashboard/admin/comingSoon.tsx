import { Construction } from 'lucide-react';

interface Props {
  title: string;
  description?: string;
}

export default function ComingSoon({ title, description }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-4">
      <Construction className="w-12 h-12 text-gray-300" />
      <h2 className="text-xl font-semibold text-gray-600 dark:text-gray-300">{title}</h2>
      <p className="text-sm text-gray-400 max-w-sm">
        {description ?? 'This section is currently under development. Check back soon for updates.'}
      </p>
    </div>
  );
}