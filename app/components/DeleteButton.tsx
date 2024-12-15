import React from 'react';

interface DeleteButtonProps {
    onDelete: (id: number) => void;
    id: number;
}

export function DeleteButton({ onDelete, id }: DeleteButtonProps) {
    return (
        <div>
            <button onClick={() => onDelete(id)}>Delete Task</button>
        </div>
    );
}

export default DeleteButton;
