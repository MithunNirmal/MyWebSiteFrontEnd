import React, { useState, useEffect, useRef } from 'react';
import '../css/AlbumForm.css'; // Assuming you have a similar CSS file for styling

const UploadAlbum = () => {
  const [file, setFile] = useState(null);
  const [cover, setCover] = useState(null);
  const [errors, setErrors] = useState({});
  const [uploadStatus, setUploadStatus] = useState('idle');
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const abortController = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setErrors({});
      setUploadStatus('idle');
      setUploadPercentage(0);
    }
  };

  const handleCoverChange = (e) => {
    if (e.target.files) {
      setCover(e.target.files[0]);
      setErrors({});
    }
  };

  const handleUpload = async () => {
    if (file && cover) {
      console.log('Uploading file...');
      setUploadStatus('uploading');
      abortController.current = new AbortController();

      const formData = new FormData();
      formData.append('file', file);
      formData.append('cover', cover);

      try {
        const result = await fetch('https://httpbin.org/post', {
          method: 'POST',
          body: formData,
          signal: abortController.current.signal,
        });

        if (!result.ok) {
          throw new Error(`Upload failed with status ${result.status}`);
        }

        const data = await result.json();
        console.log(data);
        alert('File and cover uploaded successfully');
        setFile(null);
        setCover(null);
        setUploadStatus('success');
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Upload cancelled');
          setErrors({ upload: 'Upload cancelled' });
        } else {
          console.error(error);
          setErrors({ upload: 'Error uploading file: ' + error.message });
        }
        setUploadStatus('error');
      }
    } else {
      setErrors({ file: 'Please select both a file and a cover' });
      setUploadStatus('idle');
    }
  };

  const handleCancel = () => {
    if (abortController.current) {
      abortController.current.abort();
    }
  };

  const simulateUploadProgress = () => {
    let progress = 0;
    const interval = setInterval(() => {
      if (progress >= 100 || uploadStatus === 'success' || uploadStatus === 'error') {
        clearInterval(interval);
      } else {
        progress += 10;
        setUploadPercentage(progress);
      }
    }, 200);
  };

  useEffect(() => {
    if (uploadStatus === 'uploading') {
      simulateUploadProgress();
    }
  }, [uploadStatus]);

  return (
    <div className='content-wrapper' style={{ textAlign: 'center' }}>
      <div className="container-fluid d-flex justify-content-center align-items-center h-100">
        <div className="upload-form">
          <h2>Upload Album</h2>
          <div className="form-group">
            <label htmlFor="file" className="form-label">Choose a file<span className="required">*</span>:</label>
            <input id="file" type="file" className="form-control small" onChange={handleFileChange} />
            {errors.file && <p className="error-message">{errors.file}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="cover" className="form-label">Choose a cover<span className="required">*</span>:</label>
            <input id="cover" type="file" className="form-control small" onChange={handleCoverChange} />
          </div>
          {file && cover && (
            <section className="file-details">
              <h5>File details:</h5>
              <ul>
                <li>Name: {file.name}</li>
                <li>Type: {file.type}</li>
                <li>Size: {file.size} bytes</li>
              </ul>
              <h5>Cover details:</h5>
              <ul>
                <li>Name: {cover.name}</li>
                <li>Type: {cover.type}</li>
                <li>Size: {cover.size} bytes</li>
              </ul>
            </section>
          )}
          {file && cover && (
            <>
              <button className="btn btn-success btn" onClick={handleUpload}>Upload</button>
              <button className="btn btn-danger btn" onClick={handleCancel}>Cancel Upload</button>
            </>
          )}
          {errors.upload && <p className="error-message">{errors.upload}</p>}
          {uploadStatus === 'uploading' && (
            <div className="status-message">
              <div className="loading-spinner"></div>
              <p className="percentage">{uploadPercentage}%</p>
            </div>
          )}
          {uploadStatus === 'success' && <p className="status-message success-message">File and cover uploaded successfully!</p>}
          {uploadStatus === 'error' && <p className="status-message error-message">Failed to upload file and cover. Please try again.</p>}
        </div>
      </div>
    </div>
  );
};

export default UploadAlbum;
