import classes from './ActivityInProject.module.css'
import { Button } from '@material-ui/core'

const ActivityInProject = ({ activity }) => {
  const imageLink = 'https://images.unsplash.com/photo-1485381771061-e2cbd5317d9c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'
  return (
    <div className={classes.activity}>
      <div className={classes.activityHeader}>
        <div className={classes.headerIcon}>
          <img src={imageLink} />
        </div>

        <div className={classes.titleBlock}>
          <div className={classes.title}>{activity.name}</div>
          <div className={classes.duration}>{activity.duration}</div>
        </div>
      </div>

      <div className={classes.image}>
        <img src={imageLink} />
      </div>

      <div className={classes.description}>
        {activity.description}
      </div>

      <Button
        className={classes.readyToHelpButton}
        color="primary"
        variant="contained"
      >Готов помочь</Button>
    </div>
  )
}

export default ActivityInProject