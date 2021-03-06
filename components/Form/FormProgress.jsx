import { CircularProgress } from '@material-ui/core';
import formClasses from './Form.module.css';

const FormProgress = () => (
  <div className={formClasses.progressContainer}>
    <div className={formClasses.progressWrapper}>
      <CircularProgress />
    </div>
  </div>
);

export default FormProgress;
