import React from "react";
import ReactDOM from "react-dom"
import "./Modal.css"
const Modal = (props) => {
    return ReactDOM.createPortal(
        <div
            onClick={props.onDismiss}
            className="modal-main">
            <div
                //e.stop.. tıklandığında ana divden ayrı çalışır
                onClick={(e) => e.stopPropagation()}
                className="modal-container">
                <div className="modal-title">{props.title}</div>
                <div className="modal-content">
                    {props.content}
                </div>
                <div className="modal-actions">
                    {props.actions}
                </div>
            </div>
        </div>,
        document.querySelector('#modal'))
}

export default Modal
