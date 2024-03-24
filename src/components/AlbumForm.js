import React, { useContext, useState } from 'react';
import '../css/AlbumForm.css'; // Import custom CSS file
import UrlContext from '../contexts/UrlContext';

const AlbumForm = () => {
  const urlDomain = useContext(UrlContext);
  const [albumDetails, setAlbumDetails] = useState({
    name: '',
    coverLink: '',
    primaryArtist: '',
    type:'',
    link: '',
    songs: []
  });

  const [songDetails, setSongDetails] = useState({
    name: '',
    coverLink: '',
    link: '',
    artist: ''
  });

  const [errors, setErrors] = useState({}); // State to store validation errors

  const handleAlbumChange = (e) => {
    const { name, value } = e.target;
    setAlbumDetails({ ...albumDetails, [name]: value });
  };

  const handleSongChange = (e, index) => {
    const { name, value } = e.target;
    const updatedSongs = [...albumDetails.songs];
    updatedSongs[index][name] = value;
    setAlbumDetails({ ...albumDetails, songs: updatedSongs });
  };

  const addSong = () => {
    setAlbumDetails({ ...albumDetails, songs: [...albumDetails.songs, songDetails] });
    setSongDetails({
      name: '',
      coverLink: '',
      link: '',
      artist: ''
    });
  };

  const removeSong = (index) => {
    const updatedSongs = [...albumDetails.songs];
    updatedSongs.splice(index, 1);
    setAlbumDetails({ ...albumDetails, songs: updatedSongs });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateFields(); // Validate fields before submission
    if (Object.keys(validationErrors).length === 0) {
      if (albumDetails.songs.length === 0) {
        setErrors({ songs: 'At least one song is required' });
      } else {
        console.log('Album details:', albumDetails);
        // Your code to submit album details to the backend goes here
        fetch(urlDomain+"/api/v1/album/admin/addAlbumWithGDriveLink", {
        method : "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(albumDetails)
      })
      .then((response) => {
        if(response.status === 200) {
          console.log("posted successfully");
          alert("Posted successfully");
          setAlbumDetails({
            name: '',
            coverLink: '',
            primaryArtist: '',
            link: '',
            songs: []
          });
        }
        else
        console.log("response status" + response.status);
      })
      .catch((error) => {
        console.log("Error submitting album");
      });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const isValidGoogleDriveFileFormat = (inputString) => {
    const regex = /^https:\/\/drive\.google\.com\/file\/d\/[-\w]{25,}\/view\?usp=drive_link$/;
    return regex.test(inputString);
  };

  const validateFields = () => {
    let errors = {};
    if (!albumDetails.name) {
      errors.name = 'Album name is required';
    }
    if (!albumDetails.coverLink) {
      errors.coverLink = 'Cover link is required';
    } else if(!isValidGoogleDriveFileFormat(albumDetails.coverLink )) {
      errors.coverLink = 'Invalid format for google drive file';
    }
    if (!albumDetails.primaryArtist) {
      errors.primaryArtist = 'Primary artist is required';
    }
    if (!albumDetails.link) {
      errors.link = 'Album link is required';
    }
    if(!albumDetails.type) {
      errors.type = "Type is required";
    }
    else if( albumDetails.type !== "SINGLE" && albumDetails.type !== "ALBUM" &&
    albumDetails.type != "EP" & albumDetails.type != "LP" ){
          errors.type = "Invalid type";
    }
    albumDetails.songs.forEach((song, index) => {
      if (!song.name) {
        errors[`songName${index}`] = 'Song name is required';
      }
      if (!song.coverLink) {
        errors[`songCoverLink${index}`] = 'Song cover link is required';
      } else if(!isValidGoogleDriveFileFormat(song.coverLink )) {
        errors[`songCoverLink${index}`] = 'Invalid format for google drive file';
      }
      
      if (!song.link) {
        errors[`songLink${index}`] = 'Song link is required';
      } else if(!isValidGoogleDriveFileFormat(song.link)) {
        errors[`songLink${index}`] = 'Invalid format for google drive file';
      }
      if (!song.artist) {
        errors[`songArtist${index}`] = 'Artist name is required';
      }
    });
    return errors;
  };

  return (
    <div className='content-wrapper' style={{textAlign:"center"}}>
      <div><h1>Album form with Google Drive links</h1></div>
      <div className="container-fluid d-flex justify-content-center align-items-center h-100">
        <div className="album-form">
          <h2>Add Album</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">Album Name<span className="required">*</span>:</label>
              <input type="text" className="form-control small" id="name" name="name" value={albumDetails.name} onChange={handleAlbumChange} />
              {errors.name && <p className="error-message">{errors.name}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="coverLink" className="form-label">Cover Link<span className="required">*</span>:</label>
              <input type="text" className="form-control small" id="coverLink" name="coverLink" value={albumDetails.coverLink} onChange={handleAlbumChange} />
              {errors.coverLink && <p className="error-message">{errors.coverLink}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="primaryArtist" className="form-label">Primary Artist<span className="required">*</span>:</label>
              <input type="text" className="form-control small" id="primaryArtist" name="primaryArtist" value={albumDetails.primaryArtist} onChange={handleAlbumChange} />
              {errors.primaryArtist && <p className="error-message">{errors.primaryArtist}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="link" className="form-label">Album Link<span className="required">*</span>:</label>
              <input type="text" className="form-control small" id="link" name="link" value={albumDetails.link} onChange={handleAlbumChange} />
              {errors.link && <p className="error-message">{errors.link}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="type" className="form-label">Type<span className="required">*</span>:</label>
              <input type="text" className="form-control small" id="type" name="type" value={albumDetails.type} onChange={handleAlbumChange} />
              {errors.type && <p className="error-message">{errors.type}</p>}
            </div>
            <button type="submit" style= {{marginTop: "40px"}} className="btn btn-success btn">Submit Album</button>
          </form>
        </div>
        <div>
          <h2 style= {{marginLeft: "60px"}}>Add Songs</h2>
          <div className="songs-container">
            {albumDetails.songs.map((song, index) => (
              <div key={index} className="song-form">
                <h5>Song {index + 1}</h5>
                <div className="form-group">
                  <label htmlFor={`songName${index}`} className="form-label">Song Name<span className="required">*</span>:</label>
                  <input type="text" className="form-control small" id={`songName${index}`} name="name" value={song.name} onChange={(e) => handleSongChange(e, index)} />
                  {errors[`songName${index}`] && <p className="error-message">{errors[`songName${index}`]}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor={`songCoverLink${index}`} className="form-label">Song Cover Link<span className="required">*</span>:</label>
                  <input type="text" className="form-control small" id={`songCoverLink${index}`} name="coverLink" value={song.coverLink} onChange={(e) => handleSongChange(e, index)} />
                  {errors[`songCoverLink${index}`] && <p className="error-message">{errors[`songCoverLink${index}`]}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor={`songLink${index}`} className="form-label">Song Link<span className="required">*</span>:</label>
                  <input type="text" className="form-control small" id={`songLink${index}`} name="link" value={song.link} onChange={(e) => handleSongChange(e, index)} />
                  {errors[`songLink${index}`] && <p className="error-message">{errors[`songLink${index}`]}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor={`songArtist${index}`} className="form-label">Artist<span className="required">*</span>:</label>
                  <input type="text" className="form-control small" id={`songArtist${index}`} name="artist" value={song.artist} onChange={(e) => handleSongChange(e, index)} />
                  {errors[`songArtist${index}`] && <p className="error-message">{errors[`songArtist${index}`]}</p>}
                </div>
                <button type="button" style= {{marginTop: "30px"}} className="btn btn-danger btn-sm" onClick={() => removeSong(index)}>Remove Song</button>
              </div>
            ))}
          </div>
          <button type="button" style= {{marginLeft: "50px"}} className="btn btn-primary btn-sm" onClick={addSong}>Add Song</button>
          {errors.songs && <p  style= {{marginLeft: "50px"}} className="error-message">{errors.songs}</p>}
        </div>
      </div>
    </div>
  );
};

export default AlbumForm;
