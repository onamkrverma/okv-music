import React from 'react'

const NextArrow = (props) => {
    const { className, style, onClick } = props;

  return (
    <div
      className={className}
      style={{ ...style,background:'#04152d38',borderRadius:'50%',display:'flex',justifyContent:'center',alignItems:'center', padding:'4px'}}
      onClick={onClick}
    >

    </div>
  )
}

export default NextArrow