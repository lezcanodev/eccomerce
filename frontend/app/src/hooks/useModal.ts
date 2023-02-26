import  { useState } from 'react';

export const useModal = (): [
    () => void,
    () => void,
    boolean
] => {
    const [open, setOpen] = useState<boolean>(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return [handleOpen, handleClose, open];
} 