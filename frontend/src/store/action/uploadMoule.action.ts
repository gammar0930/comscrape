import axios from "axios";
import { UPLOAD_NEW_FILE_FAILED, UPLOAD_NEW_FILE_SUCCESS } from "./type";

export const UploadData = (formData: FormData) => async (dispatch: any) => {
    console.log('-----------we are here------------')
    // // Replace 'YOUR_UPLOAD_API_ENDPOINT' with your actual API endpoint for handling file uploads
    axios.post('http://localhost:8000/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
        .then((response) => {
            console.log('File uploaded successfully!', response.data.file_id);
            dispatch({ type: UPLOAD_NEW_FILE_SUCCESS, payload: response.data.file_id })
            // You can handle success here, e.g., update state, show success message, etc.
        })
        .catch((error) => {
            console.error('Error uploading file:', error);
            dispatch({ type: UPLOAD_NEW_FILE_FAILED })
            // Handle errors here, e.g., show error message to the user
        });
}
