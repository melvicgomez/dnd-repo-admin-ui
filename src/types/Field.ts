export type FieldType = 'text' | 'checkbox' | 'date';

export type Field = {
  id: string;
  type: FieldType;
  label: string;
  value: string | boolean;
  placeholder?: string;
  isEditing: boolean;
};
