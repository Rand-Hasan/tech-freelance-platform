import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import "../styles/DialogForInvitDetailes.css";
import { useState,useEffect } from 'react';
import {ShowClientInvitaionById,CancelInvitation} from "../services/InvaitationsApi.jsx";
import { baseURL } from "../../../../services/Api/api";
import Cookies from "cookie-universal";
import axios from 'axios';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogForInvitDetailes({ open, onClose, invite }) {
    const [data,setdata]=useState([]);
 const InviteId=invite?.id;
  const cookies = Cookies();
   const token = cookies.get("token-client");
   useEffect(()=>{
    if (!invite) return;
    fetch(`${baseURL}${ShowClientInvitaionById}/${InviteId}`,{
        headers:{
             Authorization: `Bearer ${token}`
        }
    })
    .then((response)=>{
        if(!response.ok){
            throw new Error("Errorrrr");
        }
        return response.json();
    })
    .then((data) => {
        setdata(data.invitation || []);
      })
      .catch((error) => {
        console.log(error.message);
      });
   },[invite])

   function HandleCancleInvitation(){

    if (data?.status === "pending") {
         axios
      .post(
        `${baseURL}${CancelInvitation}/${InviteId}`,
        {
          cancel: "canceled",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((response) => {
        console.log(response);
        
      })
      .catch((error) => {
        console.log(error);
        
      });
  }
  onClose();
   }
  return (
    <Dialog className='Dialog'
    // PaperProps={{ className: 'DialogCard' }}
      open={open}
      slots={{
        transition: Transition,
      }}
      keepMounted
      onClose={onClose}
      aria-describedby="alert-dialog-slide-description"
      role="alertdialog"
    >
      <DialogTitle>Invitation Details</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {invite ? (
            <>
              Invitation ID: {data.id}
              <br />
              Freelancer: {data.freelancer_name}
              <br />
              Project: {data.project_name}
              <br/>
              Status: {data.status}
            </>
          ) : (
            "No invitation selected."
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
         className={data?.status === "pending" ? "CancleButton" : "closeButton"}
          onClick={HandleCancleInvitation} 
          >
          {data?.status === "pending" ? "Cancel Invitation" : "close"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
