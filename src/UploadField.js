import React from 'react';
import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'
import Uppy from '@uppy/core';
import XHRUpload from '@uppy/xhr-upload'
import { Dashboard, useUppy } from '@uppy/react'

export function UploadField(props) {
  const { ...rest } = props;
  const uppy = useUppy(() => {
    return new Uppy({
      id: props.id,
      autoProceed: false,
      logger: Uppy.debugLogger, // to be removed
      restrictions: {
        // maxFileSize={3 * 1048576},
        maxNumberOfFiles: props.limit,

      },
      onBeforeUpload: (files) => {
        // console.log(files)
        // We’ll be careful to return a new object, not mutating the original `files`
        // const updatedFiles = {}
        // Object.keys(files).forEach(fileID => {
        //   updatedFiles[fileID] = {
        //     ...files[fileID],
        //     name: `${myCustomPrefix}__${files[fileID].name}`,
        //   }
        // })
        // return updatedFiles
      },

    })
      .use(XHRUpload, { endpoint: props.endpoint, formData: true, })
  });

  if (props.isEditing) {
    // console.log('yash')
    let images = [
      { id: 1, name: 'peacock', url: "http://localhost:3000/images/peacock.jpeg" }
    ];

    // let images; 
    // fetch(props.imagesEndpoint)
    // .then(res => res.json())
    // .then((data) => {
    //   console.log(data.data)
    // })
    

    images.forEach(img => {
      if (img.name && img.url) {
        fetch(img.url)
          .then((response) => response.blob())
          .then((blob) => {
            uppy.addFile({
              id: img.id,
              name: img.name,
              type: blob.type,
              data: blob
            })
          })
      }
    });

    // Object.keys(uppy.state.files).forEach(file => {
    //   uppy.setFileState(file, {
    //     progress: { uploadComplete: true, uploadStarted: true }
    //   })
    // })
  }

  uppy.on('file-added', (file) => {
    // uppy.getFiles().forEach(file => {
    //   uppy.setFileState(file.id, {
    //     progress: { uploadComplete: true, uploadStarted: true }
    //   })
    // })
  })

  uppy.on('upload-success', (file, response) => {
    // uppy.getFiles().forEach(file => {
    //   uppy.setFileState(file.id, {
    //     progress: { uploadComplete: false, uploadStarted: false }
    //   })
    // })
    console.log('file', file);
    console.log('response', response);
  });


  if (props.isSubmitting) {
    uppy.upload()
  };


  return <Dashboard uppy={uppy} hideUploadButton={true} />
}

