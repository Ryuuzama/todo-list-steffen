import React from 'react';

interface DeleteButtonProps {
    onEdit: (id: number) => void;
    id: number;
}

export function DeleteButton({ onEdit, id }: DeleteButtonProps) {
    return (
        <div>
            <button onClick={() => onEdit(id)}>Edit Task</button>
        </div>
    );
}

export default DeleteButton;
