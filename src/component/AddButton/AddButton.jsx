import React, { useState } from 'react';
import plus from '../../assets/img/icons/plus.svg';
import './addbutton.css';
import { Box, Modal, TextField, Typography, Dialog, DialogActions, DialogTitle, DialogContent } from '@mui/material';
import save from '../../assets/img/icons/save.svg';
import error from '../../assets/img/icons/error.svg';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'; 
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';


function AddButton({ name: buttonName, btnName: type }) {
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCancel = () => setConfirmOpen(true); 

  const handleConfirmCancel = () => {
    setConfirmOpen(false); 
    setOpen(false); 
  };

  const handleRejectCancel = () => setConfirmOpen(false);

  const sharedTextFieldStyles = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      backgroundColor: 'var(--white-color)',
      border: '1px solid var(--white-color)',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
    '& .MuiInputLabel-root': {
      fontWeight: '500',
      fontSize: '14px',
      color: 'var(--dropdowntext-color)',
    },
    '& .MuiOutlinedInput-root.Mui-focused': {
      borderColor: 'var(--white-color)',
      backgroundColor: 'var(--white-color)',
    },
    width: '389px',
  };

  const handleSave = () => {
    toast.success("Kayıt başarılı!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    toast.error("Bir hata oluştu!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    
    setOpen(false);
  };

  const getLabel = (type) => {
    switch(type) {
      case 'domain':
        return 'Domain Adı';
      case 'hosting':
        return 'Hosting Adı';
      case 'sunucu':
        return 'Sunucu Adı';
      default:
        return 'Bilinmeyen Ad';
    }
  }

  return (
    <>
      <button onClick={handleOpen}>
        <img src={plus} alt="Plus" />
        {buttonName}
      </button>

      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box className="popover-box">
          <Typography className="popover-title">{buttonName}</Typography>
          <div className="inputs">
            <div className="input-box">
              <TextField label={getLabel(type)} sx={sharedTextFieldStyles} />
              <LocalizationProvider dateAdapter={AdapterDateFns} >
                <DatePicker
                  label="Açılış Tarihi"
                  sx={sharedTextFieldStyles}
                />
              </LocalizationProvider>
            </div>
            <div className="input-box">
              <TextField label="Müşteri" sx={sharedTextFieldStyles} />
              <TextField label="Fiyat" sx={sharedTextFieldStyles} />
            </div>
          </div>
          <div className="buttons">
            <button onClick={handleCancel}>İptal</button>
            <button onClick={handleSave}><img src={save} alt="" />Kaydet</button>
          </div>
        </Box>
      </Modal>

      <Dialog open={confirmOpen} onClose={handleRejectCancel}   
      PaperProps={{
        style: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '32px',
            padding: '24px 32px',
            borderRadius: '24px',
            bacgroundColor: 'var(--second-color)'
          },
        }}>
          <div className="dialog-top">
          <img src={error} alt="" style={{
            width: '64px',
            height: '64px'
          }}/>
          <DialogTitle style={{
            fontWeight: 700,
            fontSize: '24px',
            lineHeight: '31.2px',
            color: 'var(--orange-color)'
          }}>Emin misiniz?</DialogTitle >
          <DialogContent style={{
            fontWeight: 500,
            fontSize: '16px',
            lineHeight: '20.8px',
            textAlign: 'center',
            maxWidth: '358px'
            }}>
            Yapılan tüm değişiklikler silinecektir! Onaylıyor musunuz?
          </DialogContent>
          </div>
          <DialogActions className='exit-buttons'>
            <button onClick={handleRejectCancel}>
              İptal
            </button>
            <button onClick={handleConfirmCancel}>
              Sil
            </button>
          </DialogActions>
      </Dialog>


      <ToastContainer />
    </>
  );
}

export default AddButton;