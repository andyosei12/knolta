import { Fragment } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui/ui-slice";
import styles from "./Modal.module.scss";

const Overlay = () => {
  const dispatch = useDispatch();
  const closeDeleteModal = () => {
    dispatch(uiActions.closeDeleteModal());
  };
  return <div className={styles.overlay} onClick={closeDeleteModal}></div>;
};

const Modal = (props) => {
  return <div className={styles.modal}>{props.children}</div>;
};

const ModalOverlay = (props) => {
  return (
    <Fragment>
      {createPortal(<Overlay />, document.getElementById("modal"))}
      {createPortal(
        <Modal>{props.children}</Modal>,
        document.getElementById("modal")
      )}
    </Fragment>
  );
};

export default ModalOverlay;
