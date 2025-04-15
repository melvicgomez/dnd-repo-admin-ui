import { useFieldStore } from "src/store/fieldStore";

type Props = {
  id: string;
};

export default function FieldEditor({ id }: Props) {
  const field = useFieldStore((state) => state.fields.find((f) => f.id === id));
  const updateField = useFieldStore((state) => state.updateField);

  if (!field) return null;

  const handleTypeChange = (newType: string) => {
    let value: string | boolean = '';
    let placeholder: string | undefined = undefined;

    switch (newType) {
      case 'text':
        value = '';
        placeholder = 'Enter text here';
        break;
      case 'checkbox':
        value = false;
        break;
      case 'date':
        value = '';
        break;
    }

    updateField(field.id, {
      type: newType as never,
      value,
      placeholder,
    });
  };

  return (
    <div className="p-2 mt-2 space-y-2">
      <div>
        <label className="block text-sm">Label</label>
        <input
          type="text"
          value={field.label}
          onChange={(e) => updateField(field.id, { label: e.target.value })}
          className="border p-1 w-full"
        />
      </div>

      <div>
        <label className="block text-sm">Type</label>
        <select
          value={field.type}
          onChange={(e) => handleTypeChange(e.target.value)}
          className="border p-1 w-full"
        >
          <option value="text">Text</option>
          <option value="checkbox">Checkbox</option>
          <option value="date">Date</option>
        </select>
      </div>

      {field.type === 'text' && (
        <>
          <div>
            <label className="block text-sm">Placeholder</label>
            <input
              type="text"
              value={field.placeholder || ''}
              onChange={(e) =>
                updateField(field.id, { placeholder: e.target.value })
              }
              className="border p-1 w-full"
            />
          </div>

          <div>
            <label className="block text-sm">Value</label>
            <input
              type="text"
              value={field.value as string}
              onChange={(e) => updateField(field.id, { value: e.target.value })}
              className="border p-1 w-full"
            />
          </div>
        </>
      )}

      {field.type === 'checkbox' && (
        <div>
          <label className="block text-sm">Value</label>
          <input
            type="checkbox"
            checked={field.value as boolean}
            onChange={(e) => updateField(field.id, { value: e.target.checked })}
          />
        </div>
      )}

      {field.type === 'date' && (
        <div>
          <label className="block text-sm">Value</label>
          <input
            type="date"
            value={field.value as string}
            onChange={(e) => updateField(field.id, { value: e.target.value })}
            className="border p-1 w-full"
          />
        </div>
      )}
    </div>
  );
}
