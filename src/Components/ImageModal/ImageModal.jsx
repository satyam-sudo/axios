import "./ImageModal.css";
import {Link} from 'react-router-dom'

const ImageModal = ({image, id, onClick}) => {
 return (
   <>
  <div className="image-modal">
  <img src={image} alt="data" />
   <Link to='/caption'><button type='submit' onClick={() => onClick(id)}>Add Caption</button></Link>
  </div>
   </>
 );
};

export default ImageModal;
