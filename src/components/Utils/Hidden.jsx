import React from 'react';

export default function Hidden(props) {
    return (
        <>
            { props.status === false ? props.children : null }
        </>
    );
}
