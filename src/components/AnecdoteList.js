import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

import Filter from './Filter'

const AnecdoteList = (props) => {

  const vote = (id) => {
    const anecdoteToChange = props.anecdotes.find(a => a.id === id)
    const votedAnecdote = {
      ...anecdoteToChange,
      votes: anecdoteToChange.votes + 1
    }
    
    props.voteAnecdote(votedAnecdote)
    props.setNotification(`You voted anecdote '${votedAnecdote.content}'`, 2)
  }

  return (
    <div>
      <Filter />
      {props.anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  if ( state.filter === '' ) {
    return {
      anecdotes: state.anecdotes
    }
  }
  return {
    anecdotes: (state.anecdotes.filter(a => 
      a.content.toLowerCase().includes(state.filter.toLowerCase()))
    )
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  setNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)