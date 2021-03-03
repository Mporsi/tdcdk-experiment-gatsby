import React, { ReactElement, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import * as s from './styles.module.scss';

interface IModal {
    close: () => void;
    children: ReactNode;
}

export default function Modal(props: IModal): ReactElement {
    const { close, children } = props;
    const closeModal = (e: React.MouseEvent<HTMLDivElement>): void => {
        const element = e.target as HTMLDivElement;
        if (element.id === 'modal-background') {
            close();
        }
    };
    const ModalNode = (
        <div id="modal-background"  onClick={closeModal}>
            {children}
        </div>
    );

    return ReactDOM.createPortal(ModalNode, document.querySelector('#modal'));
}
