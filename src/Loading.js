import React from 'react';
import Circle from './Loading.gif'


export function Loading(props) {

    return (
                <p style={{margin:'0rem'}}>
                    <img src={Circle} alt="loading" height="300" width="450" />
                </p>
    );

}

