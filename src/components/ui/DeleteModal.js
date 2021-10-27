import { useDispatch } from "react-redux";
import useHttp from "../../hooks/use-http";

import ModalOverlay from "./ModalOverlay";
import styles from "../../styles/Modal/DeleteModal.module.css";
import { uiActions } from "../../store/ui/ui-slice";

const DeleteModal = (props) => {
  const [deleteEvent] = useHttp();
  const [deleteAppointment] = useHttp();
  const dispatch = useDispatch();
  const closeDeleteModalHandler = () => {
    dispatch(uiActions.closeDeleteModal());
  };
  const confirmDeleteHandler = () => {
    dispatch(uiActions.closeDeleteModal());
    if (props.eventId) {
      deleteEvent({
        url: `https://shccknolta-default-rtdb.firebaseio.com/events/${props.eventId}.json`,
        method: "DELETE",
      }).then(() => dispatch(uiActions.confirmDelete()));
    } else if (props.appointmentId) {
      deleteAppointment({
        url: `https://shccknolta-default-rtdb.firebaseio.com/appointments/${props.appointmentId}.json`,
        method: "DELETE",
      }).then(() => dispatch(uiActions.confirmDelete()));
    }
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
