import { useDispatch } from "react-redux";

import ModalOverlay from "./ModalOverlay";
import styles from "../../styles/Modal/DeleteModal.module.css";
import { uiActions } from "../../store/ui/ui-slice";
import { deleteEvent } from "../../store/event-action";

const DeleteModal = (props) => {
  const dispatch = useDispatch();
  const closeDeleteModalHandler = () => {
    dispatch(uiActions.closeDeleteModal());
  };
  const confirmDeleteHandler = () => {
    // dispatch(uiActions.confirmDelete());
    // console.log(props.eventId);
    dispatch(uiActions.closeDeleteModal());
    dispatch(deleteEvent(props.eventId));
  };
  return (
    <ModalOverlay>
      <h3 className={styles["delete__header"]}>Wait a second</h3>
      <p className={styles["delete__paragraph"]}>
        Deleting an item will completely remove the entry
      </p>
      <div className={styles["delete__actions"]}>
        <button
          className={styles["delete__actions--cancel"]}
          onClick={closeDeleteModalHandler}
        >
          Cancel
        </button>
        <button
          className={styles["delete__actions--confirm"]}
          onClick={confirmDeleteHandler}
        >
          Confirm
        </button>
      </div>
    </ModalOverlay>
  );
};

export default DeleteModal;
