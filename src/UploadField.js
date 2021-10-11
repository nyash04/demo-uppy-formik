import React, { useState } from "react";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import lodash from "lodash";
import Uppy from "@uppy/core";
import XHRUpload from "@uppy/xhr-upload";
import { Dashboard, useUppy } from "@uppy/react";

export function UploadField(props) {
  const { ...rest } = props;

  const [isEditing, setIsEditing] = useState(props.isEditing);

  const uppy = useUppy(() => {
    return new Uppy({
      id: `uppy-uploader-${props.id}`,
      autoProceed: false,
      logger: Uppy.debugLogger, // to be removed
      restrictions: {
        // maxFileSize={3 * 1048576},
        maxNumberOfFiles: props.limit ? props.limit : 3,
      },
      onBeforeFileAdded: (files) => {
        // console.log('onBeforeFileAdded', files)
      },
      onBeforeUpload: (files) => {
        console.log("onBeforeUpload", lodash.isEmpty(files));
        if (lodash.isEmpty(files)) {
          uppy.info("Please upload image", "error");
        } else {
          return files;
        }
      },
    }).use(XHRUpload, {
      endpoint: props.endpoint,
      formData: true,
      bundle: false,
    });
  });

  let URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "http://p.yashnarola.com/uppy";

  if (isEditing) {
    console.log("isEditing");

    let images = [
      { id: 1, name: "peacock", url: `${URL}/images/peacock.jpeg` },
      { id: 2, name: "spin", url: `${URL}/images/spin.png` },
    ];

    // let images;
    // fetch(props.imagesEndpoint)
    // .then(res => res.json())
    // .then((data) => {
    //   console.log(data.data)
    // })

    if (images.length > 0) {
      images.forEach((img) => {
        if (img.name && img.url) {
          fetch(img.url, { mode: "no-cors" })
            .then((response) => response.blob())
            .then((blob) => {
              uppy.addFile({
                name: img.name,
                type: blob.type,
                data: blob,
              });
            })
            .then(() => {
              console.log("initial files added");
              console.log("initial files added");
            });
        }
      });

      uppy.getFiles().forEach((file) => {
        console.log("getFiles", file.id);
        uppy.setFileState(file.id, {
          progress: { uploadComplete: true, uploadStarted: false },
        });
      });

      setIsEditing(!isEditing);
    }
  }

  uppy.on("file-added", (file) => {
    console.log("file-added", file);
  });

  uppy.on("upload", (data) => {
    console.log(`upload ${data.fileIDs}`);
  });

  uppy.on("upload-success", (file, response) => {
    console.log("file", file);
    console.log("response", response);
  });

  if (props.isSubmitting) {
    uppy.upload();
  }

  return <Dashboard uppy={uppy} hideUploadButton={true} height={300} />;
}
