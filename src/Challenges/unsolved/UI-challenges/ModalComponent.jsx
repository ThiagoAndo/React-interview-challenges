import React from "react";
import { createPortal } from "react-dom";
import { useState, useEffect } from "react";
import styles from "./ModalComponent.module.css";
// Modal Component Challenge:
/**
 * 1. Create a reusable Modal UI with:
 *    - A button to open the modal.
 *    - A close button (`×`) inside the modal.
 *    - Dynamic content inside the modal using children.
 * 2. Ensure the modal appears on top of the existing content.
 * Bonus:
 * - Add a backdrop that closes the modal when clicked.
 */
const Modal = ({ children, isOpen, onClick }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClick();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    isOpen &&
    createPortal(
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <div className={styles.content}>{children}</div>
        </div>
      </div>,
      document.querySelector("#modal")
    )
  );
};
const ModalUI = () => {
  const [open, setOpen] = useState(false);
  const hanldeClick = () => {
    setOpen((prev) => !prev);
  };
  return (
    <div className={styles.container}>
      <h1>MODAL COMPONENT</h1>
      <button className={styles.openButton} onClick={hanldeClick}>
        Open Modal
      </button>
      {/* In React, the pattern of passing functions as props from a parent
      component to a child component is commonly referred to as "lifting state
      up" or "callback props". */}
      <Modal isOpen={open} onClick={hanldeClick}>
        <h2>Modal Title</h2>
        <p>This is a modal content.</p>
        <button className={styles.closeButton} onClick={hanldeClick}>
          Close
        </button>
      </Modal>
    </div>
  );
};

export default ModalUI;
