import { Field } from 'src/store/fieldStore';
import { GripVertical } from 'lucide-react';

interface FieldPreviewProps {
  field: Field;
}

export default function FieldPreview({ field }: FieldPreviewProps) {
  return (
    <div className="relative space-y-1 p-3 bg-white">
      {/* Draggable Indicator */}
      <div className="absolute top-2 right-2 text-gray-400">
        <GripVertical className="w-4 h-4" />
      </div>

      {/* Field Label */}
      <label className="block text-sm font-medium text-gray-700">
        {field.label}
      </label>

      {/* Render based on type */}
      {field.type === 'text' && (
        <input
          type="text"
          value={field.value as string}
          placeholder={field.placeholder}
          disabled
          className="w-full border px-2 py-1 bg-gray-100"
        />
      )}

      {field.type === 'checkbox' && (
        <div className="flex items-center gap-2">
          <input type="checkbox" checked={Boolean(field.value)} disabled />
          <span className="text-sm text-gray-700">Checked</span>
        </div>
      )}

      {field.type === 'date' && (
        <input
          type="date"
          value={field.value as string}
          disabled
          className="w-full border px-2 py-1 bg-gray-100"
        />
      )}
    </div>
  );
}
