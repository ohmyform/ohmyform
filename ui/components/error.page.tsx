import React from 'react'

export const ErrorPage: React.FC = () => {
  return (
    <div
      style={{
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <h1>ERROR</h1>
      <p>there was an error with your request</p>
    </div>
  )
}
