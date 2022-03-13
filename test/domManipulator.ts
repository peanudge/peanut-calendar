import React from 'react';
import ReactDOM from 'react-dom'

export const createContainer = () => {
    const container = document.createElement('div');

    return {
        render: (component:React.ReactElement) => ReactDOM.render(component, container),
        container
    }
}