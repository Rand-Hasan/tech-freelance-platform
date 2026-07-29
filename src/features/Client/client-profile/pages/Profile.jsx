import "../styles/Profile.css";
import { useEffect, useState } from "react";
import Cookies from "cookie-universal";
import { ShowProfile } from "../services/MyProfileApi";
import { baseURL } from "../../../../services/Api/api";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Loading from "../../../../components/Loading/Loading";
export default function Profile() {
 
  const [PersonalData, setPersonalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const cookies = Cookies();
  const token = cookies.get("token-client");
  const navigate = useNavigate();
  const unKnownImageURL = new URL(
    "../../../../assets/UnknownPerson.png",
    import.meta.url,
  ).href;
   
  useEffect(() => {
  
   
    fetch(baseURL + ShowProfile, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      
    })
    
      .then((response) => response.json())
      .then((data) => {
        console.log("Response Data from Backend:", data);
        setLoading(false);
        // يعني اذا ماكان في داتا من الاساس راجعة ف كريت بروفايل اول شي
        if (!data.user_profile) {
          setPersonalData({
            isError: true,
            text: data.message || "Create Profile First Please ! ",
          });
        } else {
          setPersonalData(data.user_profile);
        }
      })
      .catch((error) => {
        console.error("Fetch Error:", error);
        setLoading(false);
        // هون معناها في خطأ ضرب ايرور من السيرفر
        setPersonalData({ isError: true, text: "Error Connection ! " });
      });
  }, []);


   const client_email=cookies.get('client_email');

  return (
    <div className="MyProfile">
      {loading && <Loading />}
      <div className="NameAndPhoto">
        <div className="JustPhotoAndName">
          <div className="PhotoDiv">
            <img
              className="Image"
              src={PersonalData?.photo ? PersonalData?.photo : unKnownImageURL}
              alt="Profile"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = unKnownImageURL;
              }}
            />
          </div>
          <div className="NameDiv">
            <h2 className="NameHTag">
              Name : {PersonalData?.first_name} {PersonalData?.last_name}
            </h2>
            <h6 className="NameHTag">Location :  {PersonalData?.location}</h6>
          </div>
        </div>
        <div className="NumbersDiv">
          <div className="ProjectPosted">
            <h1>24</h1>
            <h6> project posteed</h6>
          </div>
          <div className="projectCompleted">
            <h1>13</h1>
            <h6>Completed</h6>
          </div>

          <div className="avgGivin">
            <h1>4.8</h1>
            <h6> AVG.Givin</h6>
          </div>
        </div>

       

     <NavLink to="/clientlayout/setting">
  <button className="EditProfileButton">
    Edit Profile
  </button>
</NavLink>

      </div>

      <div className="ContentUnderNameAndPhotoDiv">
        <div className="LeftDivs">
          <div className="PersonalInfo">
            <h3 className="PersonalInfoTitle">Personal Information</h3>

            <div className="PersonalInfoGrid">
              <div className="InfoFieldGroup">
                <label>Full Name</label>
                <div className="InfoFieldValue">
                  {PersonalData?.first_name} {PersonalData?.last_name}
                </div>
              </div>

              <div className="InfoFieldGroup">
                <label>Email</label>
                
                <div className="InfoFieldValue">{client_email}</div>
              </div>

              <div className="InfoFieldGroup">
                <label>Phone number</label>
                <div className="InfoFieldValue">{PersonalData?.phone}</div>
              </div>

              <div className="InfoFieldGroup">
                <label>Date of birth</label>
                <div className="InfoFieldValue">{PersonalData?.birthday}</div>
              </div>

              <div className="InfoFieldGroup">
                <label>Country</label>
                <div className="InfoFieldValue">{PersonalData?.location}</div>
              </div>

              {/* <div className="InfoFieldGroup">
                <label>Company</label>
                <div className="InfoFieldValue"></div>
              </div> */}
            </div>
          </div>
          <div className="Technical_Assessment_Result">
            <h3 className="AssessmentTitle">Technical Assessment Result</h3>

            <p className="AssessmentDescription">
              As a client, you completed a short assessment to gauge your
              technical communication level. This helps freelancers understand
              how to communicate with you.
            </p>

            <div className="AssessmentBadgeRow">
              <div className="BrainIcon">🧠</div>

              <div className="BadgeTextGroup">
                <h4 className="BadgeMainText">
                  Intermediate Technical Understanding
                </h4>
                <p className="BadgeSubText">
                  Scored 7/10 — comfortable discussing architecture & technical
                  tradeoffs
                </p>
              </div>
            </div>
          </div>
          <div className="Reviews_Given">
            <h3 className="ReviewsTitle">Reviews Given (19)</h3>

            <div className="ReviewItem">
              <div className="ReviewHeaderRow">
                <h4 className="ReviewerName">Mohammed Ali</h4>
                <div className="ReviewStars">★★★★★</div>
              </div>
              <p className="ReviewText">
                "Excellent work on the AI dashboard, delivered on time with
                great communication throughout."
              </p>
              <div className="ReviewMeta">
                AI Analytics Dashboard · Jun 10, 2025
              </div>
            </div>

            <div className="ReviewItem">
              <div className="ReviewHeaderRow">
                <h4 className="ReviewerName">Nour Farouk</h4>
                <div className="ReviewStars">★★★★☆</div>
              </div>
              <p className="ReviewText">
                "Good quality data analysis, minor delays but kept us informed."
              </p>
              <div className="ReviewMeta">Sales Data Report · May 22, 2025</div>
            </div>
          </div>
        </div>

        <div className="RightDivs">
          <div className="AccountStatus">
            <h3 className="AccountStatusTitle">Account Status</h3>

            <div className="StatusRow">
              <span className="StatusLabel">Email</span>
              <span className="StatusBadge badge-verified">✓ Verified</span>
            </div>

            <div className="StatusRow">
              <span className="StatusLabel">Account type</span>
              <span className="StatusBadge badge-client">Client</span>
            </div>

            <div className="StatusRow">
              <span className="StatusLabel">Wallet (Stripe)</span>
              <span className="StatusBadge badge-connected">✓ Connected</span>
            </div>

            <div className="StatusRow">
              <span className="StatusLabel">Member since</span>

              <span className="StatusValue">
                {PersonalData?.createdAt
                  ? new Date(PersonalData?.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      },
                    )
                  : "N/A"}
              </span>
            </div>
          </div>
          {/* كرت ملخص النفقات */}
          <div className="Spending_Summary">
            <h3 className="SpendingTitle">Spending Summary</h3>
            <div className="TotalSpentContainer">
              <h1 className="TotalSpentAmount">$18,420</h1>
              <p className="TotalSpentLabel">Total spent on the platform</p>
            </div>

            <div className="SpendingCategories">
              <div className="CategoryItem">
                <div className="CategoryHeader">
                  <span className="CategoryName">Web Development</span>
                  <span className="CategoryValue">$9.2K</span>
                </div>
                <div className="ProgressBarBase">
                  <div
                    className="ProgressBarFill"
                    style={{ width: "50%" }}
                  ></div>
                </div>
              </div>

              <div className="CategoryItem">
                <div className="CategoryHeader">
                  <span className="CategoryName">UI/UX Design</span>
                  <span className="CategoryValue">$5.1K</span>
                </div>
                <div className="ProgressBarBase">
                  <div
                    className="ProgressBarFill"
                    style={{ width: "27%" }}
                  ></div>
                </div>
              </div>

              <div className="CategoryItem">
                <div className="CategoryHeader">
                  <span className="CategoryName">Mobile Apps</span>
                  <span className="CategoryValue">$22%</span>
                </div>
                <div className="ProgressBarBase">
                  <div
                    className="ProgressBarFill"
                    style={{ width: "22%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* كرت الإجراءات السريعة */}
          <div className="Quick_Actions">
            <h3 className="QuickActionsTitle">Quick Actions</h3>
            <div className="ActionButtonsGroup">
              <button
                className="ActionButton"
                onClick={() => {
                  navigate("/setting");
                }}
              >
                <span className="ActionIcon">⚙️</span> Edit Profile & Settings
              </button>
              <button
                onClick={() => {
                  navigate("/wallet");
                }}
                className="ActionButton"
              >
                <span className="ActionIcon">💰</span>
                Manage Wallet
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
