import { GalleryData } from "../GalleryData";
import { useState, useEffect } from "react"
import SortableList, { SortableItem } from 'react-easy-sort'
import { arrayMoveImmutable } from 'array-move';
import { signOut, onAuthStateChanged} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import logout from "../assets/Logout.png";
//The dnd kit didn't work so ignore the the two folders which are supposed to be exported here



function Home() {

  const [data,setData] = useState([]);
  const [collection,setCollection] = useState([]);
  const [searchInput, setSearchInput] = useState('')
  const navTo = useNavigate();




  useEffect(()=>{
    setData(GalleryData);
    setCollection([... new Set(GalleryData.map((item)=> item.title))])

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

  const gallery_filter = (itemData) =>{
    const filterData = GalleryData.filter((item)=> item.title == itemData);
    setData(filterData);
  }

  const onSortEnd = (oldIndex, newIndex) => {
    setData((array) => arrayMoveImmutable(array, oldIndex, newIndex))
  }

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



  // console.log(data)

  function searchFtn(e){

    const char = data.filter(a =>{
      return a.name.toLowerCase().includes(e.target.value.toLowerCase())
    })
    setData(char)
    setSearchInput(e.target.value)
    console.log(searchInput)
  }

 

  return (
    <div className="container">
      <div className="logout-img" onClick={logOut}>
        <img src={logout} alt="logOut-pic" />
        <p>Logout</p>
      </div>
      <div className="">
        <div className="tab">
         <button onClick={()=> setData(GalleryData)}>All</button>
          {
            collection.map((item)=>{
              return(
                <li key={item}>
                  <button onClick={()=>{gallery_filter(item)}}>{item}</button>
                </li>
              )
            })
          }
        </div>
        <div className="input">
          <input type="text" placeholder="search" value={searchInput} onChange={searchFtn}/>
        </div>
        <div className="sortable-con">
          <SortableList onSortEnd={onSortEnd} className="list" draggedItemClassName="dragged">
            {
              data.map((item)=>(
                
                <SortableItem key={item.id}>
                  <div className="img-con">
                    <img src={item.image} />
                    <p>{item.name}</p>
                  </div>
                </SortableItem>
              ))
            }
          </SortableList>
        </div>
      </div>
    </div>
  );
}

export default Home;
