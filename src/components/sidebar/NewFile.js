// import React, { useState } from 'react'
// import '../../styles/NewFile.css'
// import AddIcon from '@mui/icons-material/Add';
// import { firebasestorage, db } from '../../firebase'
// import 'firebase/firestore';
// import { makeStyles } from '@mui/styles';
// import Modal from '@mui/material/Modal';
// import { useTheme } from '@emotion/react';
// import { createTheme } from '@mui/material';


// const themeObject = createTheme()
// function getModalStyle() {
//     return {
//         top: `50%`,
//         left: `50%`,
//         transform: `translate(-50%, -50%)`,
//     };
// }

// const useStyles = makeStyles((theme) => ({
//     paper: {
//         position: 'absolute',
//         width: 400,
//         backgroundColor: theme.palette.background.paper,
//         border: '2px solid #000',
//         boxShadow: theme.shadows[5],
//         padding: theme.spacing(2, 4, 3),
//     },
// }));


// const NewFile = () => {
//     const theme = useTheme()
//     const classes = useStyles(theme);
//     const [modalStyle] = useState(getModalStyle);
//     const [open, setOpen] = useState(false);
//     const [file, setFile] = useState(null)
//     const [uploading, setUploading] = useState(false)

//     const handleOpen = () => {
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//     };

//     const handleChange = (e) => {
//         if (e.target.files[0]) {
//             setFile(e.target.files[0])
//         }
//     }

//     const handleUpload = () => {
//         setUploading(true)

//         firebasestorage.ref(`files/${file.name}`).put(file).then(snapshot => {
//             console.log(snapshot)

//             firebasestorage.ref('files').child(file.name).getDownloadURL().then(url => {
//                 //post image inside the db

//                 db.collection('myFiles').add({
//                     timestamp: firebase.firestore.FieldValue.serverTimestamp(),
//                     caption: file.name,
//                     fileUrl: url,
//                     size: snapshot._delegate.bytesTransferred,
//                 })

//                 setUploading(false)
//                 setOpen(false)
//                 setFile(null)
//             })

//             firebasestorage.ref('files').child(file.name).getMetadata().then(meta => {
//                 console.log(meta.size)
//             })

//         })
//     }

//     return (
//         <div className='newFile'>
//             <div className="newFile__container" onClick={handleOpen}>
//                 <AddIcon fontSize='large' />
//                 <p>New</p>
//             </div>

//             <Modal
//                 open={open}
//                 onClose={handleClose}
//                 aria-labelledby="simple-modal-title"
//                 aria-describedby="simple-modal-description"
//             >
//                 <div style={modalStyle} className={classes.paper}>
//                     <p>Select files you want to upload!</p>
//                     {
//                         uploading ? (
//                             <p>Uploading...</p>
//                         ) : (
//                                 <>
//                                     <input type="file" onChange={handleChange} />
//                                     <button onClick={handleUpload}>Upload</button>
//                                 </>
//                             )
//                     }
//                 </div>
//             </Modal>
//         </div>
//     )
// }

// export default NewFile

// FileUpload.js
// FileUpload.js
import React, { useState } from 'react';
import { Button, LinearProgress, Typography, Modal, Box } from '@mui/material';
import { firebasestorage , db } from '../../firebase';
import AddIcon from '@mui/icons-material/Add';
import { ref, uploadBytes } from 'firebase/storage';


const NewFile = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };
    const handleUpload = () => {
      if (!file) {
          return alert("please select any file");
      }
  
      const storageRef = ref(firebasestorage,`files/${file.name}`);
      const uploadTask = uploadBytes(storageRef , file).then(
        (snapshot) => {
          console.log(snapshot)
          const percentage = Math.round((snapshot.bytesTransferred / snapshot.totalBytes)) * 100;
          setProgress(percentage);
          console.log("file uploaded")
        },
        (error) => {
          console.error(error.message);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            db.collection('files').add({
              filename: file.name,
              url: downloadURL,
              size: snapshot._delegate.bytesTransferred,
            });
            setProgress(0);
            setFile(null);
            setModalOpen(false); // Close the modal after upload
            return "file uploaded"
          });
        }
      );
    };


  return (
    <div>
      <Button variant="contained" color="grey"  onClick={() => setModalOpen(true)}>
        <AddIcon/>
      </Button>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <input type="file" onChange={handleFileChange} />
          <Button variant="contained" color="primary" onClick={handleUpload}>
            Upload
          </Button>
          {file && (
            <Typography variant="body2" gutterBottom>
              Selected File: {file.name}
            </Typography>
          )}
          {progress > 0 && (
            <LinearProgress variant="determinate" value={progress} />
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default NewFile;
