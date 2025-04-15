import { FieldType, useFieldStore } from 'src/store/fieldStore';
import { v4 as uuidv4 } from 'uuid';
import { Field } from 'src/store/fieldStore';

export default function AddField() {
  const fields = useFieldStore((state) => state.fields);
  const setFields = useFieldStore((state) => state.setFields);

  const addField = () => {
    const type: FieldType = 'text'; // default field type

    const index = fields.filter((f) => f.type === type).length + 1;
    const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);
    const label = `${capitalizedType} ${index}`;

    const newField: Field = {
      id: uuidv4(),
      type,
      label,
      value:
        type === ('checkbox' as FieldType)
          ? false
          : type === ('date' as FieldType)
          ? new Date().toISOString().split('T')[0]
          : '',
      placeholder: type === 'text' ? 'Enter text here' : undefined,
      isEditing: false,
    };

    setFields([...fields, newField]);
  };

  return (
    <button
      onClick={addField}
      className="bg-red-600 text-white px-4 py-2 my-4 cursor-pointer"
    >
      Add Field
    </button>
  );
}
