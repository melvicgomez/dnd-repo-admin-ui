import { useFieldStore } from 'src/store/fieldStore';
import { Field } from 'src/store/fieldStore';
import { useEffect } from 'react';
import { Move, Lock, Download } from 'lucide-react';
import FieldEditor from './FieldEditor';
import FieldPreview from './FieldPreview';

const DROP_EVENT_KEY = 'cross-tab-drop-field';

export default function FieldList() {
  const fields = useFieldStore((state) => state.fields);
  const setFields = useFieldStore((state) => state.setFields);
  const updateField = useFieldStore((state) => state.updateField);

  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    const droppedField: Field = JSON.parse(
      e.dataTransfer.getData('application/json')
    );

    const exists = fields.find((f) => f.id === droppedField.id);
    const updatedFields = [...fields];

    if (!exists) {
      droppedField.isEditing = true;
      updatedFields.splice(index, 0, droppedField);

      // Signal origin to remove
      localStorage.setItem(
        DROP_EVENT_KEY,
        JSON.stringify({ id: droppedField.id, ts: Date.now() })
      );
    } else {
      const from = fields.findIndex((f) => f.id === droppedField.id);
      updatedFields.splice(from, 1);
      updatedFields.splice(index, 0, droppedField);
    }

    setFields(updatedFields);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    const listener = (e: StorageEvent) => {
      if (e.key === DROP_EVENT_KEY && e.newValue) {
        const { id } = JSON.parse(e.newValue);
        setFields((prev) => prev.filter((f) => f.id !== id));
      }
    };
    window.addEventListener('storage', listener);
    return () => window.removeEventListener('storage', listener);
  }, [setFields]);

  return (
    <div
      className={
        fields.length > 0
          ? 'flex flex-col p-2 gap-4 bg-gray-200'
          : 'flex flex-col align-middle min-h-[100px] bg-gray-200 p-2 justify-center'
      }
      onDrop={(e) => handleDrop(e, fields.length)}
      onDragOver={handleDragOver}
    >
      {fields.length === 0 && (
        <div className="px-3 pb-2 flex gap-2 justify-center align-middle">
          <Download className="w-4 h-4 text-gray-500" />
          <div className="text-center text-gray-500">DROPZONE</div>
        </div>
      )}
      {fields.map((field, index) => (
        <div
          key={field.id}
          draggable={!field.isEditing}
          onDragStart={(e) =>
            !field.isEditing &&
            e.dataTransfer.setData('application/json', JSON.stringify(field))
          }
          onDrop={(e) => handleDrop(e, index)}
          onDragOver={handleDragOver}
          className={` bg-white shadow ${
            field.isEditing ? 'cursor-not-allowed' : 'cursor-move'
          }`}
        >
          <div className="flex-grow">
            {field.isEditing ? (
              <FieldEditor id={field.id} />
            ) : (
              <FieldPreview field={field} />
            )}
          </div>
          <div className="px-3 pb-2 flex gap-2 justify-end align-middle">
            {field.isEditing ? (
              <Lock className="w-4 h-4 text-gray-400" />
            ) : (
              <Move className="w-4 h-4 text-gray-500" />
            )}
            <button
              onClick={() =>
                updateField(field.id, { isEditing: !field.isEditing })
              }
              className="text-blue-500 text-sm hover:underline cursor-pointer"
            >
              {field.isEditing ? 'Save' : 'Edit'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
