import React, { Component } from 'react';

class Loader extends Component {
    render() {
        return (
            <div className='cenloader'>
                <div className="text-center spinner"></div>
            </div>
        );
    }
}

export default Loader;