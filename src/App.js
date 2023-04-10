import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import { Divider, Grid, Typography } from "@mui/material";

const data =  [
  {
    gameId: 0,
    startedGame: false,
    homeTeam: {
      name: "Mexico",
      countryCode: "mx",
      score: 0,
    },
    awayTeam: {
      name: "Canada",
      countryCode: "ca",
      score: 0,
    },
  },
  {
    gameId: 1,
    startedGame: false,
    homeTeam: {
      name: "Spain",
      countryCode: "es",
      score: 0,
    },
    awayTeam: {
      name: "Brazil",
      countryCode: "br",
      score: 0,
    },
  },
  {
    gameId: 2,
    startedGame: false,
    homeTeam: {
      name: "Germany",
      countryCode: "de",
      score: 0,
    },
    awayTeam: {
      name: "France",
      countryCode: "fr",
      score: 0,
    },
  },
  {
    gameId: 3,
    startedGame: false,
    homeTeam: {
      name: "Uruguay",
      countryCode: "uy",
      score: 0,
    },
    awayTeam: {
      name: "Italy",
      countryCode: "it",
      score: 0,
    },
  },
  {
    gameId: 4,
    startedGame: false,
    homeTeam: {
      name: "Argentina",
      countryCode: "ar",
      score: 0,
    },
    awayTeam: {
      name: "Australia",
      countryCode: "au",
      score: 0,
    },
  },
]
const STARTING_RANGE = 25000;
const ENDING_RANGE = 10;
const competitionsDates = [
  new Date(Date.now() + Math.floor(Math.random() * STARTING_RANGE)),
  new Date(Date.now() + Math.floor(Math.random() * STARTING_RANGE)),
  new Date(Date.now() + Math.floor(Math.random() * STARTING_RANGE)),
  new Date(Date.now() + Math.floor(Math.random() * STARTING_RANGE)),
  new Date(Date.now() + Math.floor(Math.random() * STARTING_RANGE)),
];



function App() {
  const [competitions, setCompetitions] = useState([]);
  const [winners, setWinners] = useState([]);
  const updateScoreInterval = useRef();
  const startGameInterval = useRef()
  useEffect(() => {
    const updatedData = data.map((competition, index) => {
      const startDate = competitionsDates[index];
      const endDate = new Date(startDate);
      endDate.setSeconds(endDate.getSeconds() + ENDING_RANGE);

      return {
        ...competition,
        startDate,
        endDate,
        startedGame:true
      };
    });
    setCompetitions(updatedData);
  }, []);

  useEffect(() => {
    startGameInterval.current = setInterval(() => {
      setCompetitions((prevCompetitions) => {
        const now = new Date();
        return prevCompetitions.filter((comp) => {
          if (now >= comp.endDate) {
            const {
              awayTeam: { score, name },
              homeTeam: { score: homeScore, name: homeName },
            } = comp;
            if (score > homeScore) {

              setWinners((prev) => [...prev, {...comp, startedGame:false}]);
            } else {
              setWinners((prev) => [...prev, {...comp, startedGame:false}]);
            }

            return false;
          }
          return true;
        });
      });
    }, 1000);

    return () => clearInterval(startGameInterval.current);
  }, []);
  useEffect(() => {
      updateScoreInterval.current = setInterval(() => {
      setCompetitions((prevCompetitions) => {
        const updatedCompetitions = [...prevCompetitions];
        updatedCompetitions.forEach((comp) => {
          if (new Date() >= comp.startDate) {
            const randomTeamIndex = Math.floor(Math.random() * 2);
            if (randomTeamIndex === 0) {
              comp.homeTeam.score += 1;
            } else {
              comp.awayTeam.score += 1;
            }
          }
        });
        return updatedCompetitions;
      });
    }, 1000);

    return () => clearInterval(updateScoreInterval.current);
  }, []);
  if (winners.length === competitions.length) {
    clearInterval(updateScoreInterval.current);
    clearInterval(startGameInterval.current);
  }
  return (
     <div className="App">
      <Grid container spacing={2} gap={2}>
        <Grid item xs={12}>
          <Grid container>
            <Grid item flex={1}>
              <Typography variant="h5" textAlign={"center"}>
                Soccer Games
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" textAlign={"center"}>
                {competitions.length ? "Current Games" : "Finished Games"}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Divider
          variant="fullWidth"
          sx={{
            marginTop: "0.5rem",
            backgroundColor: "black",
            width: "100%",
          }}
        />
        <Grid item xs={12} sx={{ paddingLeft: "0 !important", width: "20rem" }}>
          <Grid container justifyContent={"space-between"}>
            {competitions.length
              ? competitions.map(
                  ({
                    gameId,
                    startedGame,
                    awayTeam: { score, name },
                    homeTeam: { score: homeScore, name: homeName },
                  }) => (
                    <React.Fragment key={gameId}>
                      <Grid container marginY={1} alignItems={"center"}>
                        <Grid item xs={4}>
                          <Grid container>
                            <Grid item flex={1}>
                              <Typography>{homeName}</Typography>
                          </Grid>
                          <Grid item flex={1}>
                              <Typography>{homeName}</Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={4}>
                          <Grid
                            container
                            justifyContent={"center"}
                            flexWrap={"wrap"}
                          >
                            <Grid item xs={12}>
                              {homeScore} : {score}
                            </Grid>

                            <Grid item xs={12}>
                              {" "}
                              {startedGame ? "playing" : ''}
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={4}>
                          <div>{name}</div>
                        </Grid>
                      </Grid>
                      <Divider
                        variant="fullWidth"
                        sx={{
                          marginTop: "0.5rem",
                          backgroundColor: "black",
                          width: "100%",
                        }}
                      />
                    </React.Fragment>
                  )
                )
              : winners.length
              ? winners.map(
                  ({
                    gameId,
                    startedGame,
                    awayTeam: { score, name },
                    homeTeam: { score: homeScore, name: homeName },
                  }) => (
                    <>
                      <Grid
                        container
                        key={gameId}
                        marginY={2}
                        alignItems={"center"}
                      >
                        <Grid item xs={4}>
                          <Typography>{homeName}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Grid
                            container
                            justifyContent={"center"}
                            flexWrap={"wrap"}
                          >
                            <Grid item xs={12}>
                              {homeScore} : {score}
                            </Grid>

                            <Grid item xs={12}>
                              {" "}
                              {startedGame ? "playing" : null}
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={4}>
                          <div>{name}</div>
                        </Grid>
                      </Grid>
                      <Divider
                        variant="fullWidth"
                        sx={{
                          marginTop: "0.5rem",
                          backgroundColor: "black",
                          width: "100%",
                        }}
                      />
                    </>
                  )
                )
              : null}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
