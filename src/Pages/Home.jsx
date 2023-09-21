import { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { GalleryData } from "../GalleryData";
import { signOut, onAuthStateChanged} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

import logout from "../assets/Logout.png";

function Home() {
  const [data, setData] = useState(GalleryData);
  const navTo = useNavigate();

  const gallery_filter = (itemData) => {
    const filterData = GalleryData.filter((item) => item.title === itemData);
    setData(filterData);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = [...data];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setData(items);
  };

  useEffect(()=>{
    // const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // const uid = user.uid;
        // ...
        console.log('You are in the home comp');
      } else {
        // User is signed out
        // ...
        navTo("/login");
      }
    });
  },[])

  function logOut() {
    // const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        alert("Logged Out Successfully");
        navTo("/login");
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  return (
    <div className="App">
      <div className="galleryWrapper">
        <div className="filterItem">
          <ul>
            <li>
              <button onClick={() => setData(GalleryData)}>All</button>
            </li>
            {Array.from(new Set(GalleryData.map((item) => item.title))).map(
              (item) => (
                <li key={item}>
                  <button onClick={() => gallery_filter(item)}>{item}</button>
                </li>
              )
            )}
          </ul>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="gallery" direction="horizontal">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="galleryContainer"
              >
                {data.map((item, index) => (
                  <Draggable
                    key={item.id}
                    draggableId={item.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className="galleryItem"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <img src={item.image} alt={item.title} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <div className="logout-img" onClick={logOut}>
        <img src={logout} alt="logOut-pic" />
        <p>Logout</p>
      </div>
    </div>
  );
}

export default Home;











































// import { images } from "../images"
// import { useState, useEffect } from "react"

// function Home() {

//   const [data, setData] = useState([])
//   const [collection, setCollection] = useState([])

//   useEffect(()=>{
//     setData(images)
//     setCollection([... new Set(images.map(item => item.title))])
//   },[])

// // console.log(data)
// // console.log(collection)

//   function filter(title){
//     const filterImages = images.filter(item => item.title == title)
//     setData(filterImages)
//   }
//   return (
//     <div className="gallery-wrapper">
//       <div className="filter-item">
//         <ul>
//           <li>All</li>
//           {
//             collection.map(item => <li key={item.id}><button onClick={()=>filter(item.title)}>{item}</button></li>)
//           }
//         </ul>
//       </div>
//       <div className="gallery-container">
//         {
//           data.map((a) =>{
//             return(
//               <div key={a.id} className="gallery-item">
//                 <img src={a.image} alt={a.title}/>
//               </div>
//             )
//           })
//           }
//       </div>
//     </div>
//   )
// }

// export default Home














































// import { useState, useEffect } from "react";
// import { signOut, onAuthStateChanged} from "firebase/auth";
// import { auth } from "../firebase";
// import { useNavigate } from "react-router-dom";
// import logout from "../assets/Logout.png";

// function Home() {
//   const [images, setImages] = useState([]);
//   const navTo = useNavigate();


//   const handleDrop = (e) => {
//     e.preventDefault();

//     const newImages = [...images];

//     for (const file of e.dataTransfer.files) {
//       const imageUrl = URL.createObjectURL(file);
//       newImages.push(imageUrl);
//     }
//     setImages(newImages);
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//   };

//   function logOut() {
//     // const auth = getAuth();
//     signOut(auth)
//       .then(() => {
//         // Sign-out successful.
//         alert("Logged Out Successfully");
//         navTo("/login");
//       })
//       .catch((error) => {
//         console.log(error.message);
//       });
//   }


//   useEffect(()=>{
//     // const auth = getAuth();
//     onAuthStateChanged(auth, (user) => {
//       if (user) {
//         // const uid = user.uid;
//         // ...
//         console.log('You are in the home comp');
//       } else {
//         // User is signed out
//         // ...
//         navTo("/login");
//       }
//     });
//   },[])


//   return (
//     <div className="container">
//       <div className="logout-img" onClick={logOut}>
//         <img src={logout} alt="logOut-pic" />
//       </div>
//       <div className="drop-box" onDrop={handleDrop} onDragOver={handleDragOver}>
//         <p>Drag and drop images here</p>
//       </div>

//       {/* <div className="filter">
//         <input type="text" placeholder="search" value={filters} onChange={(e)=>setFilters(e.target.value)}/>
//       </div> */}
//       <div className="image-container">
//         {images.map((imageUrl, index) => (
//           <div key="index" className="img-div">
//             <img
//               key={index}
//               src={imageUrl}
//               alt={`Image ${index}`}
//               className="image-preview"
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Home;
