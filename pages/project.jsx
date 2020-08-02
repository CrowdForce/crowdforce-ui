import { useState, useEffect } from 'react';
import { Typography, Button } from '@material-ui/core';
import { useRouter } from 'next/router';
import Page from '../components/Page';
import classes from './project.module.css';
import GoalBar from '../components/GoalBar/GoalBar'
import ActivityInProject from '../components/ ActivityInProject/ActivityInProject'
import dynamic from 'next/dynamic'
import fetchProject from '../actions/fetchProject'
import useCommonState from 'use-common-state';

const Map = dynamic(() => import('../components/Map'), { ssr: false });

const ProjectPage = () => {
  const { query } = useRouter()

  const project = useCommonState(`projects.data.${query.id}`)[0] || {}

  const imageLink = 'https://images.unsplash.com/photo-1485381771061-e2cbd5317d9c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'
  const goals = [
    {
      id: 1,
      name: 'goal 1',
      progress: 20
    },
    {
      id: 2,
      name: 'goal 2',
      progress: 45
    }
  ]

  const activities = [
    {
      id: 1,
      name: 'activity 1',
      description: 'activity description',
      startDate: '01-02-2020',
      endDate: '01-02-2020',
      participate: false
    },
    {
      id: 2,
      name: 'activity 1',
      description: 'activity description',
      startDate: '01-02-2020',
      endDate: '01-02-2020',
      participate: false
    },
    {
      id: 3,
      name: 'activity 1',
      description: 'activity description',
      startDate: '01-02-2020',
      endDate: '01-02-2020',
      participate: false
    },
    {
      id: 4,
      name: 'activity 1',
      description: 'activity description',
      startDate: '01-02-2020',
      endDate: '01-02-2020',
      participate: false
    }
  ]

  return (
    <Page>
      <div className={classes.main}>
        <div className={classes.imageBlock}>
          <img className={classes.image} src={imageLink} />
          <div className={classes.mapContainer}>
            <Map mapHeight={210}/>
          </div>
        </div>

        <div className={classes.descriptionBlock}>
          <Typography variant="h4">
            {project.name}
          </Typography>
          <div className={classes.description}>
            <Typography variant="body1">
              { project.description }
            </Typography>
          </div>

          <Button
            className={classes.subscribeButton}
            color="primary"
            variant="contained"
          >Подписаться</Button>
        </div>

        <div className={classes.goalsBlock}>
          <div className={classes.goalsTitle}>
            Наши цели
          </div>

          {goals.map(goal => <GoalBar {...goal} key={goal.id} />)}
        </div>
      </div>

      <div className={classes.activities}>
        {activities.map(
          activity => <ActivityInProject activity={activity} key={activity.id}/>
        )}
      </div>

      <Button className={classes.suggestActivityButton}>
        Предложить активность
      </Button>
    </Page>
  );
};

export default ProjectPage;
