import React from 'react';

function MyFirstComponent(props) {
  const { nom } = props; 
  
  return (
    <h3 className="first-component-style">
      El meu primer component. By **{nom}**
    </h3>
  );
}

export default MyFirstComponent;