import toast from "react-hot-toast";
export const handleImageUpload = async (image, callbackfunc) => {
  console.log("image : ",image);
  if (image) {
    
    const uploadPromise = new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("image", image);

      fetch("/api/upload", {
        method: "POST",
        body: formData,
      }).then(response => {
        if (response.ok) {
          response.json().then(data => {
            callbackfunc(data.data);
            resolve(data.data);
          });
        } else {
            console.error("Error uploading image: ", response.statusText);
          reject();
        }
      });
    //   console.log(response);
    //   if (response.ok) {
    //     const responseData = response.json();
    //     const imageUrl = responseData.data;
    //     console.log("response : ", imageUrl);
    //     callbackfunc(imageUrl);
    //     resolve(imageUrl);
    //   } else {
        
    //     reject();
    //   }
    });

    await toast.promise(uploadPromise, {
      loading: "Uploading...",
      success: "Uploaded!",
      error: "Upload error!",
    });
  }
};

// export async function upload(ev, callbackFn) {
//   const file = ev.target.files?.[0];

//   if (file) {
//     const uploadPromise = new Promise((resolve, reject) => {
//       const data = new FormData();
//       data.set("file", file);
//       fetch("/api/upload", {
//         method: "POST",
//         body: data,
//       }).then((response) => {
//         if (response.ok) {
//           response.json().then((link) => {
//             callbackFn(link);
//             resolve(link);
//           });
//         } else {
//           reject();
//         }
//       });
//     });

//     await toast.promise(uploadPromise, {
//       loading: "Uploading...",
//       success: "Uploaded!",
//       error: "Upload error!",
//     });
//   }
// }
