import React from "react";
import ReactDOM  from "react-dom";

import './modal.css';

interface IModalOptions{
    children: React.ReactNode,
    className?: string,
    classShow: string,
    classHidden: string,
    state: boolean,
    handleOpen:  () => void,
    handleClose:  () => void
}

const MODAL = document.getElementById('modal-container') as HTMLElement;

export default function Modal({
    state, 
    handleClose, children, className, classShow, classHidden}: IModalOptions){

    return ReactDOM.createPortal(<>
                <div className={`modal ${className} ${state ? classShow : classHidden} `}>
                    <div className="modal-header">
                        <button className="btn btn--normal" onClick={handleClose} style={{width:'100%', marginTop:10, marginBottom:10}}>
                             &times;
                        </button>
                    </div>
                    <div>
                        {children}
                    </div>
                </div>
                {state && <div className="modal-overlay" onClick={handleClose}></div>}
                </>, MODAL );
}