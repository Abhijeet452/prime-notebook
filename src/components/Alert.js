import React from 'react'

function Alert(props) {
    const capitalize = (word) => {
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    return (
        <div style={{height:'40px'}} className="sticky-lg-top">
            {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
                <strong>{capitalize(props.alert.type) === 'Danger' ? 'Failed' : capitalize(props.alert.type)}</strong>: {props.alert.msg}
            </div>}
            {props.msg}
        </div>
    )
}

export default Alert