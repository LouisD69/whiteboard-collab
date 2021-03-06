import React from 'react';
import '../board/board.css';

class Board extends React.Component
{   
    timeout;
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.drawOnCanvas()
    }

    drawOnCanvas() {
        var canvas = document.querySelector('#board');
        this.ctx = canvas.getContext('2d');
        var ctx = this.ctx;

        var sketch = document.querySelector('#sketch');
        var sketch_style = getComputedStyle(sketch);
        canvas.width = parseInt(sketch_style.getPropertyValue('width'));
        canvas.height = parseInt(sketch_style.getPropertyValue('height'));

        var mouse = {x: 0, y: 0};
        var last_mouse = {x: 0, y: 0};

        /* Mouse Capturing Work */
        canvas.addEventListener('mousemove', function(e) {
            last_mouse.x = mouse.x;
            last_mouse.y = mouse.y;

            mouse.x = e.pageX - this.offsetLeft;
            mouse.y = e.pageY - this.offsetTop;
        }, false);


        /* Drawing on Paint App */
        ctx.lineWidth = this.props.size;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        //ctx.strokeStyle = this.props.color;
        ctx.strokeStyle = this.props.color;

        canvas.addEventListener('mousedown', function(e) {
            canvas.addEventListener('mousemove', onPaint, false);
        }, false);

        canvas.addEventListener('mouseup', function() {
            canvas.removeEventListener('mousemove', onPaint, false);
        }, false);

        var root = this;
        var onPaint = function() {
            ctx.beginPath();
            ctx.moveTo(last_mouse.x, last_mouse.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.closePath();
            ctx.stroke();

            // timeout is used to reduce bandwidth
            // when drawing a line, it only sends to the client once
            // the user pauses (when the line is complete)
            // instead of sending every pixel update
            if(root.timeout != undefined) clearTimeout(root.timeout); // resets the timeout???
            root.timeout = setTimeout(function(){
                var base64ImageData = canvas.toDataURL("image/png");
                // root.socket.emit("canvas-data", base64ImageData);
            }, 1000)
        };
    }

    render(){
        return(
            <div className='sketch' id="sketch">
                <canvas className='board' id="board">

                </canvas>
            </div>                
        )
    }
}

export default Board;