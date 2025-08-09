import { v4 as uuidv4 } from 'uuid';

export function generateId() {
  return uuidv4().toString().replaceAll('-', '');
}

// TODO: Delete this!
export const xxx = '';
