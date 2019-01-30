import Noty from 'noty';

const TYPES = ['alert', 'success', 'error', 'warning', 'info'];
const POSITIONS = [
  'top',
  'topLeft',
  'topCenter',
  'topRight',
  'center',
  'centerLeft',
  'centerRight',
  'bottom',
  'bottomLeft',
  'bottomCenter',
  'bottomRight',
];

export function showNotification({ text, type, position, timeout = 3000 }) {
  if (!text) {
    throw new Error('Notification text must be present');
  }
  if (!TYPES.includes(type)) {
    throw new Error(`Notification type must be in [${TYPES.join(', ')}], got: ${type}`);
  }
  if (!POSITIONS.includes(position)) {
    throw new Error(`Notification position must be in [${POSITIONS.join(', ')}], got: ${position}`);
  }

  require('noty/lib/noty.css');
  require('noty/lib/themes/semanticui.css');

  new Noty({
    type,
    text,
    layout: position,
    theme: 'semanticui',
    timeout,
    progressBar: true,
  }).show();
}
