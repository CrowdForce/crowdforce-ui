import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import useCommonState from 'use-common-state';
import MapProjectList from '../MapProjectList';
import classes from './MapContainer.module.css';
import fetchProjects from '../../actions/fetchProjects';

const Map = dynamic(() => import('../Map'), { ssr: false });

const makeProjectsFilterByBounds = (bounds) => (project) => {
  if (!bounds) return false;
  const isProjectFit = bounds.contains(L.latLng(project.lat, project.lng));
  const isAnyActivityFit = project.activities.some((activity) => (
    bounds.contains(L.latLng(activity.lat, activity.lng))
  ));
  return isProjectFit || isAnyActivityFit;
};

const MapContainer = () => {
  useEffect(() => {
    fetchProjects();
  }, []);
  const [isLoadingProjects] = useCommonState('projects.isLoading');
  const [projects] = useCommonState('projects.json', []);
  const [bounds, setBounds] = useState(null);
  const activities = projects.flatMap((project) => project.activities);
  const projectsToShow = projects.filter(makeProjectsFilterByBounds(bounds));
  return (<div className={classes.wrapper}>
    <Map projects={projects} activities={activities} onViewportChange={setBounds}/>
    <MapProjectList projects={projectsToShow} isLoading={isLoadingProjects}/>
  </div>);
};


export default MapContainer;