import classes from './GoalBar.module.css'
import { Button } from '@material-ui/core'

const GoalBar = ({ name, progress }) => {
  return (
    <div className={classes.goalBar}>
      <div className={classes.name}>
        {name}
      </div>
      <div className={classes.main}>
        <div className={classes.progressBarContainer}>
          <div
            className={classes.progressBar}
            style={{ width: 350 * progress / 100 }}
          ></div>
        </div>

        <div className={classes.helpButton}>ПОМОЧЬ</div>
      </div>
    </div>
  )
}

export default GoalBar