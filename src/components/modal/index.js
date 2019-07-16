import React from 'react'
import './modal.css'

const modal = (props) => {
    return (
        <div className={`modal-wrapper ${props.show ? 'show' : ''}`}>
            <div className="overlay" />
            <div className="modal">
                <div className="modal-header">
                    <h3>Location Area</h3>
                    <span className="close-modal-btn" onClick={props.close}>×</span>
                </div>
                <div className="modal-body">
                    <div>
                        {props.children}
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="btn-cancel" onClick={props.close}>CLOSE</button>
                    {/* <button className="btn-continue">CONTINUE</button> */}
                </div>
            </div>
        </div>
    )
}

export default modal;