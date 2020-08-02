import React, { useEffect, useRef, useState } from 'react';
import useCommonState from 'use-common-state';
import { Map as LeafletMap, Marker, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import { LinearProgress } from '@material-ui/core';
import fetchProjects from '../../actions/fetchProjects';
import classes from './Map.module.css';
import ProjectCard from './ProjectCard';

const INITIAL_POSITION = {
  lat: 59.937500,
  lng: 30.308611,
};
const INITIAL_ZOOM = 11;

const projectPinIcon = new L.Icon({
  iconUrl: '/project-pin.png',
  iconAnchor: [17, 41],
  iconSize: [34, 49],
});

const Map = ({
  mapHeight = 600
}) => {
  const mapRef = useRef(null);
  const [projects = []] = useCommonState('projects.data');
  const [isLoadingProjects = true] = useCommonState('projects.isLoading');
  const [activeProjectId, setActiveProjectId] = useState(null);

  const handleProjectClick = (projectId) => {
    setActiveProjectId(projectId);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className={classes.root}>
      {isLoadingProjects && <LinearProgress style={{ marginBottom: '-4px', zIndex: 1 }} />}
      <LeafletMap
        center={[INITIAL_POSITION.lat, INITIAL_POSITION.lng]}
        zoom={INITIAL_ZOOM}
        ref={mapRef}
        style={{
          height: `${mapHeight}px`,
          transform: 'translate3D(0,0,0)',
        }}
      >
        <TileLayer
          attribution="©OpenStreetMap, ©CartoDB"
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
        />
        {projects.length && projects.map((project) => (
          <Marker
            key={project.id}
            position={[project.lat, project.lng]}
            icon={projectPinIcon}
            data-project-id={project.id}
            onclick={() => handleProjectClick(project.id)}
          />
        ))}
      </LeafletMap>
      {activeProjectId && <ProjectCard projectId={activeProjectId} onClose={() => setActiveProjectId(null)} />}
    </div>
  );
};

export default Map;
