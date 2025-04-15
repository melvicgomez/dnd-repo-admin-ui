import { create } from 'zustand';

export type FieldType = 'text' | 'checkbox' | 'date';

export interface Field {
  id: string;
  type: FieldType;
  label: string;
  value: string | boolean | null;
  placeholder?: string;
  isEditing: boolean;
}

interface FieldStore {
  fields: Field[];
  setFields: (fields: Field[] | ((prev: Field[]) => Field[])) => void;
  updateField: (id: string, updates: Partial<Field>) => void;
  addField: (type: FieldType) => void;
}

export const useFieldStore = create<FieldStore>((set, get) => ({
  fields: [],
  setFields: (fieldsOrUpdater) =>
    set((state) => ({
      fields:
        typeof fieldsOrUpdater === 'function'
          ? fieldsOrUpdater(state.fields)
          : fieldsOrUpdater,
    })),
  updateField: (id, updates) =>
    set((state) => ({
      fields: state.fields.map((field) =>
        field.id === id ? { ...field, ...updates } : field
      ),
    })),
  addField: (type) => {
    const state = get();
    const index = state.fields.filter((f) => f.type === type).length + 1;

    const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);
    const label = `${capitalizedType} ${index}`;

    const newField: Field = {
      id: crypto.randomUUID(),
      type,
      label,
      value: type === 'checkbox' ? false : '',
      placeholder: type === 'text' ? '' : undefined,
      isEditing: false, // preview mode by default
    };

    set({ fields: [...state.fields, newField] });
  },
}));
