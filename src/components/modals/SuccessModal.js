import React from "react";
import reactDOM from "react-dom"
import { connect } from "react-redux";
import { makeFalseModal } from "../../actions";
import "./SuccessModal.css"

const SuccessModal = (props) => {
    if (props.success.open) {
        setTimeout(() => {
            props.makeFalseModal()
        }, 4500);
    }
    return reactDOM.createPortal(
        <div
            // onClick={props.onDismiss}
            className="modal-one">
            <div onClick={(e) => e.stopPropagation()}
                className="modal-two" style={props.success.where ? { backgroundColor: "rgb(124, 218, 109)" } : {backgroundColor:"tomato"}}>
                <div className="modal-message">
                    {props.content}
                </div>
            </div>
        </div>,
        document.querySelector("#success-modal"))
}
const mapStateToProps = state => {
    return { success: state.success }
}

export default connect(mapStateToProps, { makeFalseModal })(SuccessModal)