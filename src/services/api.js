import axios from "axios";

const URL = 'https://determined-gray-sun-hat.cyclic.app'

const upload = async (jsonData) => {
  try {
    console.log(jsonData);
    // const Data=JSON.stringify(jsonData);
    // console.log(Data);
    const response = await axios.post(`${URL}/upload`,jsonData);
    
    return response;
  } catch (error) {
    console.error("Error uploading image:", error);
  }
};

export const updatelike=async(item)=>{
  try{
    const response=await axios.post(`${URL}/updatelike`,item);
    return response;

  } catch(error) {
    console.log(error);
  }

}
export const addComment = async(comment, id) => {
  try{
    return await axios.post(`${URL}/addcomment/${id}`, {comment})
  } catch(error){
    console.log(error);
  }
}

export default upload;

