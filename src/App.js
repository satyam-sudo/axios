import './App.css';
import axios from "axios"
import {useState, useEffect, useCallback} from "react"
import ImageModal from './Components/ImageModal/ImageModal';
import DetailsModal from './Components/detailsModal/DetailsModal';

function App() {
  const [images, setImages] = useState([])
  const [searchKeyword, setSearchKeyword] = useState("")
  const [result, setResult] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [download, setDownload] = useState('')
  const [previewImage, setPreviewImage] = useState('');
  const [downloads, setDownloads] = useState(0);
  const [tags, setTags] = useState([])
  
  const changePhoto = () => {
    axios.get(`https://api.unsplash.com/search/photos?page=1&query=office?client_id=hKrsNVAEkZmudXDkNQWzZgzY31YMJwrQGz7-Le7T_Ho`).then((response) => {
      setImages(response.data)
      console.log(response.data)
    })
  }
  const searchPhoto = () => {
    axios.get(`https://api.unsplash.com/search/photos?page=1&query=${searchKeyword}&client_id=hKrsNVAEkZmudXDkNQWzZgzY31YMJwrQGz7-Le7T_Ho`).then((response) => {
      setResult(response.data.results)
      console.log(response.data.results)
    })
  }

  const debounce = (fn, delay) => {
    var timer = null;
    return function() {
      var context = this,
        args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function() {
        fn.apply(context, args);
      }, delay);
    };
  }
  const handleChangeState = (e) => {
    setSearchKeyword(e.target.value)
  }
  const debounceStateChange = useCallback(debounce(handleChangeState, 200), []);
  const getDetails = async (id) => {
    await axios.get(`https://api.unsplash.com/photos/${id}?client_id=hKrsNVAEkZmudXDkNQWzZgzY31YMJwrQGz7-Le7T_Ho`).then((response)=>{
      console.log(response)
      setDownload(response.data.links.download_location)
      setPreviewImage(response.data.urls.regular)
      
    })
    setOpenModal(true)
  }
  useEffect(() => {
    changePhoto()
  },[])
  
  useEffect(() => {
    searchPhoto()
  }, [searchKeyword])

  return (
    <div className="App">
    <h1>Name:Satyam Gupta</h1>
    <h1>Email:guptasatyam323@gmail.com</h1>
      <div className='search-bar'>
        <input type="text"  placeholder="Search Image..." onChange={debounceStateChange}/>
      </div>
      <div className='images-div'>
        { searchKeyword === '' ? (
          images.map((value, index) => {
            return(
              <ImageModal image={value.urls.small}   id={value.id} onClick={getDetails} key={index}/>
            )
          }) 
        ):
          (
            result.map((value, index) => {
              return(
                <ImageModal image={value.urls.small}   onClick={getDetails} id={value.id} key={index}/>
              )
            })
          )
        }

      </div>
      {openModal && <DetailsModal image={previewImage} download={download} tags={tags} closeModal={setOpenModal}  downloads={downloads}/>}
    </div>
  );
}

export default App;
