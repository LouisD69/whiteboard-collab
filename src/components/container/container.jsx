import Board from '../board/board';
import React from 'react';
import '../container/container.css';

class Container extends React.Component
{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className='container'>
                <div className='color-picker-container'>
                    <input type="color">
                    </input>
                </div>

                <div className='board-container'>
                    <Board>

                    </Board>
                </div>
            </div>
        )
    }
}

export default Container;
