import { timeoutCollection } from "time-events-manager"

const notificationReducer =  (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'HIDE_NOTIFICATION':
      return state = ''
    default:
      return state
  }
}

export const setNotification = (notification, time) => {
  return dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: notification
    })
    timeoutCollection.removeAll()
    setTimeout(() => {
      dispatch({
        type: 'HIDE_NOTIFICATION'
      })
    }, time * 1000);
  } 
}

export default notificationReducer