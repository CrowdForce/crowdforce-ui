import {
  Dialog, TextField, DialogTitle, Button, LinearProgress,
} from '@material-ui/core';
import useCommonState from 'use-common-state';
import { useState } from 'react';
import Schema from 'validate';
import { Alert } from '@material-ui/lab';
import classes from './LoginForm.module.css';
import openLoginForm from '../../actions/openLoginForm';
import ajax from '../../utils/ajax';
import getErrorMessage from '../../utils/getErrorMessage';
import fetchUser from '../../actions/fetchUser';

const sendCodeSchema = new Schema({
  username: {
    type: String,
    required: true,
    message: 'Обязательное поле',
  },
});

const loginSchema = new Schema({
  username: {
    type: String,
    required: true,
    message: 'Обязательное поле',
  },
  password: {
    type: String,
    required: true,
    message: 'Обязательное поле',
  },
});

const defaultFormData = {
  username: null,
  password: null,
};

const LoginForm = () => {
  const [open = false, setOpenLoginForm] = useCommonState('openLoginForm');
  const [formData, setFormData] = useState(defaultFormData);
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);

  const handleClose = () => {
    openLoginForm(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendCodeSubmit = (e) => {
    e.preventDefault();
    setFormErrors({});
    const errors = sendCodeSchema.validate(formData);

    errors.forEach((error) => {
      const { path, message } = error;
      setFormErrors((prev) => ({ ...prev, [path]: message }));
    });

    if (!errors.length) {
      setLoading(true);
      ajax.post('api/sendCode', { userName: formData.username })
        .then(() => setStep(1))
        .catch((error) => setFormErrors({ global: getErrorMessage(error) }))
        .finally(() => setLoading(false));
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setFormErrors({});
    const errors = loginSchema.validate(formData);

    errors.forEach((error) => {
      const { path, message } = error;
      setFormErrors((prev) => ({ ...prev, [path]: message }));
    });

    if (!errors.length) {
      setLoading(true);
      ajax.post('api/login', formData)
        .then(() => window.location.reload())
        .catch((error) => setFormErrors({ global: getErrorMessage(error) }))
        .finally(() => setLoading(false));
    }
  };

  const handleExited = () => {
    setFormErrors({});
    setStep(0);
    setFormData(defaultFormData);
  };

  return (
    <Dialog onClose={handleClose} open={open} onExited={handleExited}>
      {loading && (
        <>
          <LinearProgress style={{ marginBottom: '-4px' }} />
          <div className={classes.overlay} />
        </>
      )}
      {formErrors.global && (
        <Alert severity="error">
          {formErrors.global}
        </Alert>
      )}
      <DialogTitle style={{ textAlign: 'center' }}>Вход через телеграм</DialogTitle>
      <div className={classes.formContainer}>
        <form className={classes.form} onSubmit={handleSendCodeSubmit} style={{ marginLeft: `-${step * 100}%` }}>
          <TextField
            value={formData.username || ''}
            onChange={handleChange}
            autoFocus
            fullWidth
            helperText={formErrors.username}
            error={!!formErrors.username}
            label="@username или телефон"
            variant="outlined"
            name="username"
          />
          <div className={classes.buttons}>
            <Button onClick={() => setOpenLoginForm(false)}>Закрыть</Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              получить код
            </Button>
          </div>
        </form>
        <form className={classes.form} onSubmit={handleLoginSubmit}>
          <TextField
            value={formData.password || ''}
            onChange={handleChange}
            fullWidth
            helperText={formErrors.password}
            error={!!formErrors.password}
            label="Код"
            variant="outlined"
            name="password"
          />
          <div className={classes.buttons}>
            <Button onClick={() => setOpenLoginForm(false)}>Закрыть</Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              войти
            </Button>
          </div>
        </form>
      </div>
    </Dialog>
  );
};

export default LoginForm;
