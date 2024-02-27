import axios from "axios";

export const UploadData = (formData: FormData) => {
    // // Replace 'YOUR_UPLOAD_API_ENDPOINT' with your actual API endpoint for handling file uploads
    axios.post('http://localhost:8000/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
        .then((response) => {
            console.log('File uploaded successfully!', response.data);
            // You can handle success here, e.g., update state, show success message, etc.
        })
        .catch((error) => {
            console.error('Error uploading file:', error);
            // Handle errors here, e.g., show error message to the user
        });
}
