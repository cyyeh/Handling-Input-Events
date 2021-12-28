/*
* all the code for homework 2 goes into this file.
You will attach event handlers to the document, workspace, and targets defined in the html file
to handle mouse, touch and possible other events.

You will certainly need a large number of global variables to keep track of the current modes and states
of the interaction.
*/
const EVENT_STATE = {
  'selected': {
    'target': null,
  },
  'moved': {
    'target': null,
    'originalX': '',
    'originalY': '',
    'hasMoved': false,
    'isMoveEnd': false,
    'isDoubleClicked': false,
    'isEscaped': false,
  },
}

const $WorkSpace= document.getElementById('workspace')

function onClickDivHandler(event) {
  // console.log('onClickDivHandler...')

  if (
    EVENT_STATE.selected.target &&
    event.target === $WorkSpace &&
    !EVENT_STATE.moved.isEscaped
  ) {
    EVENT_STATE.selected.target.style.backgroundColor = 'red'
  } else {
    if (
      EVENT_STATE.selected.target && 
      EVENT_STATE.selected.target !== event.target &&
      !EVENT_STATE.moved.hasMoved
    ) {
      EVENT_STATE.selected.target.style.backgroundColor = 'red'
    }

    if (
      EVENT_STATE.moved.target === event.target &&
      !EVENT_STATE.moved.hasMoved
    ) {
      EVENT_STATE.selected.target = event.target
      EVENT_STATE.selected.target.style.backgroundColor = 'blue'
    }
  }
}

function onMoseDownDivHandler(event) {
  // console.log('onMoseDownDivHandler...')

  if (event.target === $WorkSpace) {
    return
  }

  EVENT_STATE.moved.target = event.target
  EVENT_STATE.moved.originalX = event.target.style.left
  EVENT_STATE.moved.originalY = event.target.style.top
  EVENT_STATE.moved.hasMoved = false
  EVENT_STATE.moved.isMoveEnd = false
  EVENT_STATE.moved.isEscaped = false
}

function onMouseMoveDivHandler(event) {
  // console.log('onMouseMoveDivHandler...')

  if(event.target !== EVENT_STATE.moved.target ||
    EVENT_STATE.moved.isMoveEnd) {
    return
  }

  if (event.movementX !== 0 || event.movementY !== 0) {
    EVENT_STATE.moved.hasMoved = true
    event.target.style.left = `${parseInt(event.target.style.left) + event.movementX}px`
    event.target.style.top = `${parseInt(event.target.style.top) + event.movementY}px`
  }
}

function onMouseUpDivHandler(event) {
  // console.log('onMouseUpDivHandler...')

  EVENT_STATE.moved.isMoveEnd = true
}

function onDoubleClickDivHandler(event) {
  // console.log('onDoubleClickDivHandler...')

  EVENT_STATE.moved.isMoveEnd = false
  EVENT_STATE.moved.isDoubleClicked = true
}

function onKeydownDivHandler(event) {
  // console.log('onKeydownDivHandler...')

  if (event.key === 'Escape' && !EVENT_STATE.moved.isMoveEnd) {
    EVENT_STATE.moved.target.style.left = EVENT_STATE.moved.originalX
    EVENT_STATE.moved.target.style.top = EVENT_STATE.moved.originalY
    EVENT_STATE.moved.isMoveEnd = true
    EVENT_STATE.moved.isEscaped = true
  }
}

document.addEventListener('click', onClickDivHandler)
document.addEventListener('mousedown', onMoseDownDivHandler)
document.addEventListener('mousemove', onMouseMoveDivHandler)
document.addEventListener('mouseup', onMouseUpDivHandler)
document.addEventListener('dblclick', onDoubleClickDivHandler)
document.addEventListener('keydown', onKeydownDivHandler)