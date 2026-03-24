import { useState } from "react";
import "./Modal.scss";

export const Modal = ({title, headerColor,children}) => {
  //Initialisation ----------------------------
  //State --------------------------------------
  //Handlers -----------------------------------
  //View ---------------------------------------

  return (
    <div className='ModalOverlay'>
        <div className='ModalPane'>
            <header style = {{backgroundColor: headerColor}}>
              <p>{title}</p>
            </header>
            <main>{children}</main>
        </div>
    </div>
  );
};

export const useModal = (initialState) => {
  //State --------------------------------------
  const [isOpen, setIsOpen] = useState(initialState);

  //Handlers -----------------------------------
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  //Return ---------------------------------------
  return [isOpen, open, close];

};