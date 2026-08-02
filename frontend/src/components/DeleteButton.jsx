import { useState } from 'react';

export default function DeleteButton({ onDelete, confirmMessage = 'Delete this item?', className = 'povir-btn-secondary py-1 px-3 text-xs' }) {
  const [deleting, setDeleting] = useState(false);
  const handleClick = async () => {
    if (!window.confirm(confirmMessage)) return;
    setDeleting(true);
    try {
      await onDelete();
    } finally {
      setDeleting(false);
    }
  };
  return (
    <button onClick={handleClick} disabled={deleting} className={className} style={{ color: 'rgb(var(--color-destructive))', opacity: deleting ? 0.5 : 1 }}>
      {deleting ? '…' : 'Delete'}
    </button>
  );
}
