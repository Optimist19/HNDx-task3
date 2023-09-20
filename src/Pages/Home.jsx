import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import {useNavigate} from 'react-router-dom'
import logout from '../assets/Logout.png'

function Home() {
  const [images, setImages] = useState([]);
  const navTo = useNavigate()
  // const [filters, setFilters] = useState('');

  const handleDrop = (e) => {
    e.preventDefault();

    const newImages = [...images];

    for (const file of e.dataTransfer.files) {
      const imageUrl = URL.createObjectURL(file);
      newImages.push(imageUrl);
    }
    setImages(newImages);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  function logOut() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        alert('Logged Out SUccessfully')
        navTo('/login')
      })
      .catch((error) => {
        console.log(error.message)
    });
  }

  // function filterImage(e){
  //   const a = images.filter((img, index)=>{
  //     // console.log(img)
  //     return index.toLowerCase.includes(filters.toLowerCase())
  //   })

  //   setImages(a)
  // }

  return (
    <div className="container">
      <div className="logout-img" onClick={logOut}>
        <img src={logout} alt="logOut-pic" />
      </div>
      <div className="drop-box" onDrop={handleDrop} onDragOver={handleDragOver}>
        <p>Drag and drop images here</p>
      </div>

      {/* <div className="filter">
        <input type="text" placeholder="search" value={filters} onChange={(e)=>setFilters(e.target.value)}/>
      </div> */}
      <div className="image-container">
        {images.map((imageUrl, index) => (
          <div key="index" className="img-div">
            <img
              key={index}
              src={imageUrl}
              alt={`Image ${index}`}
              className="image-preview"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
