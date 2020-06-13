import { Button, Dialog, DialogContent, DialogTitle, TextField, } from '@material-ui/core';
import useCommonState from 'use-common-state';
import classes from './LoginForm.module.css';
import openLoginForm from '../../actions/openLoginForm';
import { useState } from 'react';

const STATE = {
  USERNAME: 'USERNAME',
  VERIFICATION: 'VERIFICATION',
  SUCCESS: 'SUCCESS',
  USERNAME_ERROR: 'USERNAME_ERROR',
  VERIFICATION_ERROR: 'VERIFICATION_ERROR'
};

const BASE_URL = 'http://crowdforce-api-lb-2087918798.eu-central-1.elb.amazonaws.com';
const USERNAME_API_URL = `${BASE_URL}/api/v1/user/telegram/send-code`;
const VERIFICATION_API_URL = `${BASE_URL}/api/v1/user/telegram/verify-code`;

const LoginForm = () => {
  const [open] = useCommonState('openLoginForm');
  const [state, setState] = useState(STATE.USERNAME);
  const [username, setUsername] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const sendUsername = () => {
    window.fetch(USERNAME_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ userName: username })
    })
      .then(() => {
        setState(STATE.VERIFICATION);
      })
      .catch(() => {
        setState(STATE.USERNAME_ERROR);
      });
  };
  const sendVerificationCode = () => {
    window.fetch(VERIFICATION_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ verificationCode })
    })
      .then(() => {
        setState(STATE.SUCCESS);
      })
      .catch(() => {
        setState(STATE.VERIFICATION_ERROR);
      });
  };
  const tryAgain = () => {
    setState(STATE.USERNAME);
  };
  const close = () => {
    openLoginForm(false);
  };
  switch (state) {
    case STATE.USERNAME:
      return (
        <Dialog onClose={close} open={open}>
          <DialogTitle>Вход через телеграм</DialogTitle>
          <form className={classes.root} onSubmit={e => {e.preventDefault();sendUsername()}}>
            <DialogContent>
              <TextField
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoFocus
                fullWidth
                label="@username"
                variant="outlined"
              />
              <div className={classes.button}>
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  onClick={sendUsername}>
                  Получить код
                </Button>
              </div>
            </DialogContent>
          </form>
        </Dialog>
      );
    case STATE.VERIFICATION:
      return (
        <Dialog onClose={() => openLoginForm(false)} open={open}>
          <DialogTitle>Введите код подтверждения</DialogTitle>
          <form className={classes.root}>
            <DialogContent>
              <TextField
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                autoFocus
                fullWidth
                label="Код подтверждeния"
                variant="outlined"
              />
              <div className={classes.button}>
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  onClick={sendVerificationCode()}>
                    Отправить
                </Button>
              </div>
            </DialogContent>
          </form>
        </Dialog>
      );
    case STATE.SUCCESS:
      return (
        <Dialog onClose={() => openLoginForm(false)} open={open}>
          <DialogTitle>Добро пожаловать!</DialogTitle>
          <Button type="button" variant="contained" color="primary" onClick={close}>Ок</Button>
        </Dialog>
      );
    case STATE.USERNAME_ERROR:
      return (
        <Dialog onClose={() => openLoginForm(false)} open={open}>
          <DialogTitle>Произошла ошибка</DialogTitle>
          <Button
            type="button"
            variant="contained"
            color="primary"
            onClick={tryAgain}>
              Попробовать еще
          </Button>
        </Dialog>
      );
    case STATE.VERIFICATION_ERROR:
      return (
        <Dialog onClose={() => openLoginForm(false)} open={open}>
          <DialogTitle>Неверный код</DialogTitle>
          <Button
            type="button"
            variant="contained"
            color="primary"
            onClick={tryAgain}>
              Попробовать еще
          </Button>
        </Dialog>
      );
  }
};

export default LoginForm;
