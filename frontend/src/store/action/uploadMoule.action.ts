import axios from "axios";
import { UPLOAD_NEW_FILE_FAILED, UPLOAD_NEW_FILE_SUCCESS } from "./type";

export const UploadData = (formData: FormData) => async (dispatch: any) => {
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:8000/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((response) => {
                console.log('File uploaded successfully!', response.data.file_id);
                dispatch({ type: UPLOAD_NEW_FILE_SUCCESS, payload: response.data.file_id });
                resolve(response); // Resolve the promise with the response
            })
            .catch((error) => {
                console.error('Error uploading file:', error);
                dispatch({ type: UPLOAD_NEW_FILE_FAILED, payload: error });
                reject(error); // Reject the promise with the error
            });
    });
};
