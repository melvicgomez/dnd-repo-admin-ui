import { useFieldStore } from "src/store/fieldStore";
import { Field } from "src/types/Field";

type Props = {
  field: Field;
};

export default function DraggableField({ field }: Props) {
  const setFields = useFieldStore((state) => state.setFields);
  const fields = useFieldStore((state) => state.fields);

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('application/json', JSON.stringify(field));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('application/json');
    const droppedField = JSON.parse(data) as Field;

    if (!fields.find((f) => f.id === droppedField.id)) {
      setFields([...fields, droppedField]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="p-3 border bg-white shadow mb-2"
    >
      <strong>{field.label || '(Unnamed Field)'}</strong>
    </div>
  );
}
