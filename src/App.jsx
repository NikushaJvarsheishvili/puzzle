import {  useState, useEffect } from 'react'
import './App.css'
import { Image } from './Image';

function App() {
//  const [items, setItems] = useState([1, 3, 2, 4, 8, 6, 7, 5, 9])
 const [items, setItems] = useState([{id: 1}, {id: 5}, {id: 3}, {id: 4}, {id: 2}, {id: 6}, {id: 7}, {id: 8}, {id: 9},])

 const [draggedItem, setDraggedItem] = useState(null);
 const [indexFrom, setIndexFrom] = useState()

const correctVersion = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const handleRandom = () => {
  let newArray = [{id: 2}]
  for(let i = 0; i < 9; i++) {
    const newId = Math.floor(Math.random() * i)
    if(newArray[i].id !== newId) {
        newArray.push({
          id: newId
        })
    }
    
  }
  
  console.log(newArray)
  



  setItems(newArray)
}


const handleDrop = (indexTo) => {    
    let temp = items[indexFrom]
    items[indexFrom] = items[indexTo]
    items[indexTo] = temp
    setItems((prev) => [...prev])
};


useEffect(() => {
  for(let i = 0; i < 9; i++) {
    if(items[i].id !== correctVersion[i]) {
      return;
    }
  }
  alert("Finish :D")
}, [items])



const handleDragStart = (e, index) => {
    setDraggedItem(items[index]);
    setIndexFrom(index)
    e.dataTransfer.setData('text/plain', index);
  };

const handleDragOver = (e) => {
    e.preventDefault();
};

const imageCut = () => {
  const imageArray = []
  for(let i = 0; i< 9; i++) {
    let newTile = {
      id: i + 1,
      top: -(Math.floor(i/5)) * 133,
      left: i<5 ? -i * 200 : -(i%5) * 200
    }
    imageArray.push(newTile)
  }
  setItems([...imageArray])
}



const colors = ['red', 'orange', 'green', 'blue', 'yellow', 'parple', 'gray', 'black', 'brown']


    return (
    <div>
      <h2>Puzzle master</h2>
      <button onClick={handleRandom}>shuffle</button>
      <button onClick={() => imageCut()}>S</button>
      <div className='container'>
        {items.map((item, index) => (
        <div
          key={index}
          className='item'
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={handleDragOver}
          onDrop={() => handleDrop(index)}
          style={{
            // backgroundColor: draggedItem === item ? 'lightblue' : 'white',
            backgroundColor: colors[item && item.id]
          }}
        >
        
          {/* <Image left={item.left} top={item.top} id={item.id}/> */}
          {item && item.id}
          
        </div>
      ))}
      </div>
    </div>
  );



}

export default App
