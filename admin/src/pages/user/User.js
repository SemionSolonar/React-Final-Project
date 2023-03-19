
import {
    CalendarToday,
    MailOutline,
    PermIdentity,
    Publish,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./user.css";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import { useState } from "react";
import { updateUser } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import  app  from "../../firebase-config";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


export default function User() {
    const location = useLocation();
    const userId = location.pathname.split("/")[2];
    const [inputs, setInputs] = useState([]);
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();

    const user = useSelector(state => 
        state.user.users.find(user => user.uid === userId)
    );

    const handleChange = (e) => {
        setInputs(prev=>{
            return {...prev, [e.target.name]: e.target.value}
        })
    };

    const handleClick = (e) => {
        e.preventDefault();
        const fileName = new Date().getTime() + file.name;
        const storage = getStorage(app);
        const storageRef = ref(storage, "images/" + fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
    
        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
              default:
            }
          },
          (error) => {
            // Handle unsuccessful uploads
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              const user = { ...inputs, img: downloadURL};
              updateUser(user, dispatch);
            });
          }
        );
    };


    return (
        <div className="user">
            <div className="userTitleContainer">
                <h1 className="userTitle">Edit User</h1>
            </div>
            <div className="userContainer">
                <div className="userShow">
                    <div className="userShowTop">
                        <img
                            src="https://play-lh.googleusercontent.com/tmASL-0Jg5bq3RKsneEFVCcAth0M7jFLI7alQQyKSEqrpvLuMfW4mfkw4iSkLCj9_zo"
                            alt=""
                            className="userShowImg"
                        />
                        <div className="userShowTopTitle">
                            <span className="userShowUsername">{user.firstName} {user.lastName}</span>
                        </div>
                    </div>
                    <div className="userShowBottom">
                        <span className="userShowTitle">Account Details</span>
                        <div className="userShowInfo">
                            <PermIdentity className="userShowIcon" />
                            <span className="userShowInfoTitle">{user.username}</span>
                        </div>
                        <div className="userShowInfo">
                            <CalendarToday className="userShowIcon" />
                            <span className="userShowInfoTitle">{new Date(user.createdAt).toLocaleDateString('en-GB').split("/").join(".")}</span>
                        </div>
                        <span className="userShowTitle">Contact Details</span>
                        <div className="userShowInfo">
                            <MailOutline className="userShowIcon" />
                            <span className="userShowInfoTitle">{user.email}</span>
                        </div>
                    </div>
                </div>
                <div className="userUpdate">
                    <span className="userUpdateTitle">Edit</span>
                    <form className="userUpdateForm">
                        <div className="userUpdateLeft">
                            <div className="userUpdateItem">
                                <label>Username</label>
                                <input
                                    name = "username"
                                    type="text"
                                    placeholder={user.username}
                                    className="userUpdateInput"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>First Name</label>
                                <input
                                    name = "firstName"
                                    type="text"
                                    placeholder={user.firstName}
                                    className="userUpdateInput"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Last Name</label>
                                <input
                                    name = "lastName"
                                    type="text"
                                    placeholder={user.lastName}
                                    className="userUpdateInput"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Email</label>
                                <input
                                    name = "email"
                                    type="text"
                                    placeholder={user.email}
                                    className="userUpdateInput"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="userUpdateRight">
                            <div className="userUpdateUpload">
                                <img
                                    className="userUpdateImg"
                                    src="https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
                                    alt=""
                                />
                                <label htmlFor="file">
                                    <Publish className="userUpdateIcon" />
                                </label>
                                <input type="file" id="file" style={{ display: "none" }} onChange={e=>setFile(e.target.files[0])}/>
                            </div>
                            <button onClick={handleClick} className="userUpdateButton">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}