import "../../Portifolio/Styles/Showportofoliodetails.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "cookie-universal";
import { baseURL } from "../../../../services/Api/api";
import Loading from "../../../../components/Loading/Loading";
import {
  ShowProjectDetailes,
  UpdateProjectInPortofolio,
} from "../../../FreeLancer/Portifolio/Services/CreatePortofolioApi";
import { useNavigate } from "react-router-dom";

export default function Showportofoliodetails() {

  const cookies = Cookies();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [isEditing, setIsEditing] = useState(false);

  const [editData, setEditData] = useState({
    project_name: "",
  });

  const [newPhotos, setNewPhotos] = useState([]);

  const navigate = useNavigate();


  async function getProjectDetails() {

    try {

      setLoading(true);
      setError("");

      const token = cookies.get("token-freelancer");
      const projectId = cookies.get("project-id");


      const response = await axios.get(
        `${baseURL}${ShowProjectDetailes}${projectId}`,
        {
          headers:{
            Authorization:`Bearer ${token}`,
          }
        }
      );


      console.log(
        "GET DETAILS RESPONSE:",
        response.data
      );


      const projectData =
        response.data.projects ||
        response.data.project;


      setProject(projectData);


      setEditData({
        project_name:
          projectData?.project_name || "",
      });


    } catch(err){

      console.log(
        "GET ERROR:",
        err.response?.data
      );

      setError(
        err.response?.data?.message ||
        "Server Error"
      );


    } finally {

      setLoading(false);

    }

  }



  useEffect(()=>{
    getProjectDetails();
  },[]);




  async function handleUpdate(){

    try{

      setLoading(true);
      setError("");


      const token =
        cookies.get("token-freelancer");


      const projectId =
        cookies.get("project-id");



      const formData = new FormData();


      formData.append(
        "project_name",
        editData.project_name
      );



      newPhotos.forEach((photo)=>{

        formData.append(
          "photo",
          photo
        );

      });



      console.log(
        "UPDATE URL:",
        `${baseURL}${UpdateProjectInPortofolio}${projectId}`
      );



      const response = await axios.post(

        `${baseURL}${UpdateProjectInPortofolio}${projectId}`,

        formData,

        {
          headers:{
            Authorization:`Bearer ${token}`,
           
          }
        }

      );



      console.log(
        "UPDATE SUCCESS:",
        response.data
      );



      setNewPhotos([]);

      setIsEditing(false);


      await getProjectDetails();



    }catch(err){


      console.log(
        "UPDATE STATUS:",
        err.response?.status
      );


      console.log(
        "UPDATE ERROR:",
        err.response?.data
      );



      setError(
        err.response?.data?.message ||
        "Failed to update"
      );



    }finally{

      setLoading(false);

    }

  }

  return (

    <div className="project-details-container">


      {
        loading &&
        <Loading/>
      }

      {
        error &&
        <div className="error-message">
          {error}
        </div>
      }

      <button

        className="back-btn"

        onClick={()=> 
          navigate(
            "/freelancerlayout/showprofile/portfolio"
          )
        }

      >
        ← Back to Portfolio

      </button>

      {
        isEditing ? (


          <div className="edit-project-container">



            <div className="edit-header">

              <h2>
                Edit Project
              </h2>

              <p>
                Make changes to your project details.
              </p>

            </div>
            <div className="input-group">


              <label>
                Project Name
              </label>


              <input

                type="text"

                value={
                  editData.project_name
                }


                onChange={(e)=>

                  setEditData({

                    ...editData,

                    project_name:
                      e.target.value

                  })

                }

              />

            </div>

            <div className="input-group">


              <label
  htmlFor="filee-upload"
  className="custom-filee-upload"
>

                📷 Upload Images

              </label>



              <input

                id="filee-upload"

                type="file"

                multiple

                accept="image/*"

                style={{
                  display:"none"
                }}


                onChange={(e)=>{


                  const files =
                    Array.from(
                      e.target.files
                    );


                  setNewPhotos(prev=>[
                    ...prev,
                    ...files
                  ]);


                }}

              />

              <div className="preview-images">


                {
                  newPhotos.map(
                    (image,index)=>(
                    <div
                      key={index}
                      className="preview-card"
                    >
                      <img

                        src={
                          URL.createObjectURL(
                            image
                          )
                        }

                        alt="preview"
                      />

                      <button

                        type="button"
                        className="remove-image-btn"

                        onClick={()=>

                          setNewPhotos(prev=>
                            prev.filter(
                              (_,i)=>
                              i !== index
                            )
                          )
                        }
                      >

                        ×

                      </button>



                    </div>


                  ))
                }

              </div>

            </div>

            <div className="form-actions">
              <button
                className="cancel-btnn"

                onClick={()=>{
                  setEditData({
                    project_name:
                      project?.project_name || ""
                  });

                  setNewPhotos([]);
                  setIsEditing(false);
                }}

              >
                Cancel

              </button>

              <button

                className="save-btnn"

                onClick={handleUpdate}

                disabled={loading}

              >

                {
                  loading
                  ?
                  "Saving..."
                  :
                  "Save Changes"
                }

              </button>

            </div>

          </div>
        )

        :
        (
          <>
          <div className="project-header">


            <h1 className="project-title">

              {project?.project_name}

            </h1>

            <button

              className="edit-project-btn"

              onClick={()=>
                setIsEditing(true)
              }

            >

              Edit Project

            </button>


          </div>

          <div className="images-section">


            <h2 className="section-title">

              PROJECT IMAGES

            </h2>

            <div className="images-grid">


              {
                project?.Images?.map(
                  (image)=>(

                  <div

                    className="image-card"

                    key={image.id}

                  >

                    <img

                      src={image.image}

                      alt="Project"

                    />

                  </div>


                ))
              }



            </div>



          </div>


          </>


        )

      }



    </div>

  );

}