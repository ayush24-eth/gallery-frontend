import React, { useState, useEffect } from "react";
import axios from "axios";
import { updatelike, addComment } from "./services/api";
import { useNavigate } from "react-router-dom";

function GetImage() {
  const [fetchedData, setFetchedData] = useState([]);
  const [likeditem, setLikeditem] = useState({});
  const [comment, setComment] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const URL = "https://determined-gray-sun-hat.cyclic.app/upload";
    axios
      .get(URL)
      .then((response) => {
        console.log(response.data);
        const Data = response.data.reverse();
        const newData = Data.map((item) => {
          return { isLiked: false, ...item };
        });
        setFetchedData(newData);
        // console.log(fetchedData);

        // setFetchedData(newData);
        // console.log(newData);
      })
      .catch((error) => {
        console.error("Error fetching data from the server:", error);
      });
  }, []);
  useEffect(() => {
    const updateTheLikes = async () => {
      const res = await updatelike(likeditem);
      console.log(res);
      const updatedImage = res.data.updatedImage;

      console.log(updatedImage);
      // console.log(newdata);

      const newdata = fetchedData.map((item) => {
        if (item._id === updatedImage._id) {
          return {
            ...item,
            likes: updatedImage.likes,
            isLiked: likeditem.isLiked,
          };
        }
        return item;
      });
      console.log(newdata);
      setFetchedData(newdata);
    };
    updateTheLikes();
  }, [likeditem]);

  const handleLike = async (imageData) => {
    // console.log(fetchedData);
    // const newdata = ;
    // console.log(res);
    // console.log(newdata);
    // setFetchedData((prevdata) =>
    const likeddata = fetchedData.map((item) => {
      // console.log(item);
      if (item._id === imageData._id) {
        console.log(item.isLiked);
        const newitem = { ...item, isLiked: !item.isLiked };
        console.log(newitem);
        setLikeditem(newitem);

        // const res = await updatelike(newitem);
        //   console.log(res);

        // const updatedImage = res.data.updatedImage;
        // console.log(updatedImage);
        return newitem;
      }
      return item;
    });
    // );
    console.log(likeddata);
    setFetchedData(likeddata);
    console.log(fetchedData);
    console.log(likeditem);

    // const res = await updatelike(likeditem);

    // console.log(res.data.updatedImage);
    // const updatedImage=res.data.updatedImage;
    // setFetchedData(() =>
    //   fetchedData.map((item) => {
    //     // console.log(item);
    //     if (item._id === updatedImage._id) {
    //       return {...item, updatedImage}
    //     }
    //     return item;
    //   })
    // );
  };
  // const handleLike = async(imageId, index) => {
  //     axios.put(`/upload/${imageId}`)
  //   .then((response) => {
  //     setLike(like[index].likes+1);
  //     setFetchedData(like);
  //   })
  //   .catch((error) => {
  //     console.error('Failed to update like count:', error);
  //   });
  // }
  const handleChange = async (e) => {
    console.log(e.target.value);
    // const name=e.target.name;
    // const value= e.target.value;
    // setComment((prevdata)=>{
    //     return {...prevdata,[name]:value};
    // });
    setComment(e.target.value);
  };

  const handleComment = async (imageData) => {
    // e.preventDefault();
    // console.log(e.target);
    if (comment !== "") {
      const res = await addComment(comment, imageData._id);
      console.log(res.data);
      const updatedComment = res.data.updatedImage.comments;
      setFetchedData((prevdata) =>
        fetchedData.map((item) => {
          if (item._id === imageData._id) {
            return { ...item, comments: updatedComment };
          }
          return item;
        })
      );
    }
    setComment("");
    navigate('/')
  };

  return (
    <div className="flex-box">
      {/* <ul> */}
      {fetchedData &&
        fetchedData.map((imageData, index) => (
          <div key={index} className="border boder-secondary m-3 rounded">
            <div className="m-2 p-2">
              <img src={imageData.base64} alt={imageData.tags} />
              <p className="h4 mt-2" style={{ maxWidth: "250px" }}>
                {imageData.filename}
              </p>
            </div>
            <div className="m-2 p-2">
              <div className="d-flex">
                <span className="h5 p-2">Tags:</span>
                <span className="p-2">
                  {imageData.tags.map((tag, tagIndex) => (
                    <span className="p-1" key={tagIndex}>
                      {tag}
                    </span>
                  ))}
                </span>
              </div>
              <div className="d-flex m-1">
                <button
                  className="btn btn-primary"
                  // className={`btn `}
                  onClick={() => handleLike(imageData)}
                >
                  {imageData.isLiked ? "LIKED" : "like"}
                </button>
                <p className="h6 d-flex align-items-end ps-2">
                  Likes: {imageData.likes}
                </p>
              </div>
            </div>
            <div className="my-2 p-2">
              <div className="d-flex">
                <input
                  className="m-1 p-2 form-control border border-secondary"
                  type="text"
                  onChange={handleChange}
                  // value={comment}
                //   name="comment"
                ></input>
                <button
                  className="btn btn-warning m-1"
                  onClick={() => handleComment(imageData)}
                >
                  comment
                </button>
              </div>
              <div className="my-3 comment">
                <ul className="list-group flex-column-reverse">
                  {imageData.comments.map((comment, commentIndex) => (
                    <li className="list-group-item d-flex" key={commentIndex}>
                      {comment}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      {/* </ul> */}
    </div>
  );
}

export default GetImage;