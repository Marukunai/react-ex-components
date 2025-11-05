import React from 'react';
import Post from './components/Post';
import { initialPostData } from './data/postData';

function App() {
  return (
    <div className="app-container">
        
        <h1 className="app-title">Simulació Instagram Post</h1>
        
        {/* Passa l'objecte de dades sencer a Post */}
        <Post postData={initialPostData} /> 

    </div>
  );
}

export default App;