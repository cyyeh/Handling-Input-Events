/*
* all the code for homework 2 goes into this file.
You will attach event handlers to the document, workspace, and targets defined in the html file
to handle mouse, touch and possible other events.

You will certainly need a large number of global variables to keep track of the current modes and states
of the interaction.
*/
const state = {
  'selected': {
    'target': null,
  },
  'moved': {
    'target': null,
    'originalX': '',
    'originalY': '',
    'hasMoved': false,
    'isMoveEnd': false,
  },
}

const $WorkSpace= document.getElementById('workspace')

function onClickDivHandler(event) {
  console.log('onClickDivHandler...')

  if (state.selected.target && event.target !== state.selected.target && !state.moved.hasMoved) {
    state.selected.target.style.backgroundColor = 'red'
  }

  if ((event.target !== $WorkSpace) && 
      (event.target === state.moved.target && !state.moved.hasMoved)) {
    state.selected.target = event.target
    state.selected.target.style.backgroundColor = 'blue'
  }
}

function onMoseDownDivHandler(event) {
  console.log('onMoseDownDivHandler...')

  if (event.target === $WorkSpace) {
    return
  }
  state.moved.target = event.target
  state.moved.originalX = event.target.style.left
  state.moved.originalY = event.target.style.top
  state.moved.hasMoved = false
  state.moved.isMoveEnd = false
}

function onMouseMoveDivHandler(event) {
  console.log('onMouseMoveDivHandler...')

  if(event.target !== state.moved.target || state.moved.isMoveEnd) {
    return
  }

  if (event.movementX !== 0 || event.movementY !== 0) {
    state.moved.hasMoved = true
    event.target.style.left = `${parseInt(event.target.style.left) + event.movementX}px`
    event.target.style.top = `${parseInt(event.target.style.top) + event.movementY}px`
  }
}

function onMouseUpDivHandler(event) {
  console.log('onMouseUpDivHandler...')

  state.moved.isMoveEnd = true
}

document.addEventListener('click', onClickDivHandler)
document.addEventListener('mousedown', onMoseDownDivHandler)
document.addEventListener('mousemove', onMouseMoveDivHandler)
document.addEventListener('mouseup', onMouseUpDivHandler)