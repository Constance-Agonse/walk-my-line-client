import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';


import { useAuth } from "./../../auth/UserContext";
import JourneyCard from "../../components/JourneyCard";
import { Header } from '../../components/Header';
import APIHandler from "./../../api/APIHandler";
import { getUserAvatarUrl } from '../../helpers/getUserAvatarUrl';

import "./ProfilePage.css";

export const ProfilePage = () => {
  const { currentUser } = useAuth();
  const [currentTab, setCurrentTab] = React.useState('1');
  const [users, setUsers] = useState([]);
  const [journeysCreateByUser, setJourneysCreateByUser] = useState([]);
  const [journeysFollowedByUser, setJourneysFollowedByUser] = useState([]);

  useEffect(() => {
    fetchJourneys();
  }, []);

  const fetchJourneys = async () => {
    try {
      const res = await APIHandler.get("/profile");
      setUsers(res.data[0]);
      setJourneysCreateByUser(res.data[2]);
      setJourneysFollowedByUser(res.data[3]);
    } catch (err) {
      console.error(err);
    }
  };

  const renderJourneysFollowedByUser = () => {
    if (journeysFollowedByUser.length === 0) {
      return (
        <h2>No liked journies yet...</h2>
      )
    }
    return journeysFollowedByUser.map((journey) => {
      return (
        <JourneyCard
          key={journey._id}
          journeyData={journey}
          handleDelete={handleDeleteJourney}
        />
      )
    })
  }

  const renderJourneysCreateByUser = () => {
    if (journeysCreateByUser.length === 0) {
      return (
        <h2>No journies created yet...</h2>
      )
    }
    return journeysCreateByUser.map((journey) => {
      return (
        <JourneyCard
          key={journey._id}
          journeyData={journey}
          handleDelete={handleDeleteJourney}
        />
      )
    })
  }

  const handleDeleteJourney = async (id) => {
    try {
      await APIHandler.delete(`/profile/${id}`);
      fetchJourneys();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="CreateJourneyPage">
      <Header />
      <div className="CreateJourneyPage__profile-section">
        <img src={getUserAvatarUrl(currentUser?.profilePic)} className="CreateJourneyPage__profile-section__pic" />
        <div className="CreateJourneyPage__profile-section__info">
          <div className="CreateJourneyPage__profile-section__info__name">
            {currentUser.username}
          </div>
          <div className="CreateJourneyPage__profile-section__info__item">
            My journeys ({journeysCreateByUser.length})
          </div>
          <div className="CreateJourneyPage__profile-section__info__item">
            Liked journeys ({journeysFollowedByUser.length})
          </div>
        </div>
      </div>
      <div className="CreateJourneyPage__content">
        <TabContext value={currentTab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList
              onChange={(_, tab) => {
                setCurrentTab(tab);
              }}
              variant="fullWidth"
              aria-label="lab API tabs example"
            >
              <Tab label="MY JOURNEYS" value="1" />
              <Tab label="LIKED JOURNEYS" value="2" />
            </TabList>
          </Box>
          <div className="CreateJourneyPage__content__tab">
            <TabPanel value="1">
              {renderJourneysCreateByUser()}
            </TabPanel>
          </div>
          <div className="CreateJourneyPage__content__tab">
            <TabPanel value="2">
              {renderJourneysFollowedByUser()}
            </TabPanel>
          </div>
        </TabContext>
      </div>
    </div>
  );
}