import { useState, useEffect } from 'react';
import './App.css';

const SIZE = 3;
const TILE_SIZE = 100;

function App() {
  const correctVersion = Array.from({ length: 9 }, (_, i) => i + 1);

  const [items, setItems] = useState([]);
  const [indexFrom, setIndexFrom] = useState(null);
  const [imageSrc, setImageSrc] = useState("/assets/images/car.jpg");

  useEffect(() => {
    imageCut();
  }, []);

  const imageCut = () => {
    const imageArray = [];

    for (let i = 0; i < 9; i++) {
      imageArray.push({
        id: i + 1,
        bgPos: {
          x: -(i % SIZE) * TILE_SIZE,
          y: -Math.floor(i / SIZE) * TILE_SIZE
        }
      });
    }

    setItems(imageArray);
  };

  const handleRandom = () => {
    const newArr = [...items].sort(() => Math.random() - 0.5);
    setItems(newArr);
  };

  const handleDragStart = (index) => {
    setIndexFrom(index);
  };

  const handleDrop = (indexTo) => {
    if (indexFrom === null) return;

    const newItems = [...items];
    const temp = newItems[indexFrom];
    newItems[indexFrom] = newItems[indexTo];
    newItems[indexTo] = temp;

    setItems(newItems);
    setIndexFrom(null);
  };

  useEffect(() => {
    if (items.length === 0) return;

    const isCorrect = items.every((item, index) => item.id === correctVersion[index]);

    if (isCorrect) {
      alert("Finish 😎");
    }
  }, [items]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const imageURL = URL.createObjectURL(file);
    setImageSrc(imageURL);
    imageCut();
    setTimeout(() => handleRandom(), 100);
  };

  return (
    <div className="app">
      <h2>Puzzle Master</h2>

      <div className="controls">
        <button onClick={handleRandom}>Shuffle</button>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
      </div>

      <div className="container">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="item"
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(index)}
            style={{
              backgroundImage: imageSrc ? `url(${imageSrc})` : "none",
              backgroundPosition: `${item.bgPos.x}px ${item.bgPos.y}px`,
              backgroundSize: "300px 300px"
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
