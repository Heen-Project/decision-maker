import React from 'react'

const Action = (props) => (
    <div>
        <button className="big-button" 
            onClick={props.handleMakeDecision}
            disabled={!props.hasOptions}>
            Make Decision
        </button>
    </div>
)

export default Action