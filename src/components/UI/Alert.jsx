import { useState } from "react";
import { Modal, useModal } from "./Modal.jsx";
import Spacer from "./Spacer.jsx";
import Action from "./Actions.jsx";
import "./Alert.scss";

export const Alert = ({ message, onDismiss }) => {
  //Initialisation ----------------------------
  //State --------------------------------------
  //Handlers -----------------------------------
  //View ---------------------------------------

  return (
    <Modal tittle="Alert" headerColor="DodgerBlue">
      <Spacer>
        <p className="alertMessage">{message}</p>
        <Action.Tray>
          <Action.Dismiss showText onClick={onDismiss} />
        </Action.Tray>
      </Spacer>
    </Modal>
  );
};

export const Error = ({ message, onDismiss }) => {
  //Initialisation ----------------------------
  //State --------------------------------------
  //Handlers -----------------------------------
  //View ---------------------------------------

  return (
    <Modal tittle="Error" headerColor="Red">
      <Spacer>
        <p className="alertMessage">{message}</p>
        <Action.Tray>
          <Action.Dismiss showText onClick={onDismiss} />
        </Action.Tray>
      </Spacer>
    </Modal>
  );
};

export const Confirm = ({ message, onConfirm, onDismiss }) => {
  //Initialisation ----------------------------
  //State --------------------------------------
  //Handlers -----------------------------------

  const handleConfirm = () => {
    onConfirm();
    onDismiss();
  };
  //View ---------------------------------------

  return (
    <Modal tittle="Confirmation needed" headerColor="Red">
      <Spacer>
        <p className="alertMessage">{message}</p>
        <Action.Tray>
          <Action.Yes showText onClick={handleConfirm} />
          <Action.Dismiss showText onClick={onDismiss} />
        </Action.Tray>
      </Spacer>
    </Modal>
  );
};

export const useAlert = () => {
  //State --------------------------------------
  const [isOpen, openModal, close] = useModal(false);
  const [message, setMessage] = useState(null);

  //Handlers -----------------------------------
  const open = (message) => {
    setMessage(message);
    openModal();
  };

  //Return ---------------------------------------
  return [isOpen, message, open, close];
};
