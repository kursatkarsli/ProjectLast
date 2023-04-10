import React, { useEffect, useState, useRef } from "react";
import "./ScoreBoard.css";
import { Divider, Grid, Typography } from "@mui/material";
import { competitionData } from "./assets/data/competitionData";
import { competitionsDates } from "./assets/data/competitionDates";
import { ENDING_RANGE } from "./assets/constants";
function ScoreBoard() {
  const [competitions, setCompetitions] = useState([]);
  const [winners, setWinners] = useState([]);
  const updateScoreInterval = useRef();
  const startGameInterval = useRef();
  useEffect(() => {
    const updatedData = competitionData.map((competition, index) => {
      const startDate = competitionsDates[index];
      const endDate = new Date(startDate);
      endDate.setSeconds(endDate.getSeconds() + ENDING_RANGE);

      return {
        ...competition,
        startDate,
        endDate,
      };
    });
    setCompetitions(updatedData);
  }, []);
  // Interval for starting game
  useEffect(() => {
    startGameInterval.current = setInterval(() => {
      setCompetitions((prevCompetitions) => {
        const now = new Date();
        return prevCompetitions.filter((comp) => {
          if (now >= comp.endDate) {
            const {
              awayTeam: { score },
              homeTeam: { score: homeScore },
            } = comp;
            if (score > homeScore) {
              setWinners((prev) => [...prev, { ...comp, startedGame: false }]);
            } else {
              setWinners((prev) => [...prev, { ...comp, startedGame: false }]);
            }

            return false;
          }
          return true;
        });
      });
    }, 2500);

    return () => clearInterval(startGameInterval.current);
  }, []);

  // Interval for update score

  useEffect(() => {
    updateScoreInterval.current = setInterval(() => {
      setCompetitions((prevCompetitions) => {
        const updatedCompetitions = [...prevCompetitions];
        updatedCompetitions.forEach((comp) => {
          if (new Date() >= comp.startDate) {
            const randomTeamIndex = Math.floor(Math.random() * 2);
            if (randomTeamIndex === 0) {
              comp.homeTeam.score += 1;
              comp.startedGame = true;

              if (
                comp.homeTeam.winningRate < 100 &&
                comp.awayTeam.winningRate > 0
              ) {
                comp.homeTeam.winningRate += 10;
                comp.awayTeam.winningRate -= 10;
              }
            } else {
              comp.awayTeam.score += 1;
              comp.startedGame = true;

              if (
                comp.awayTeam.winningRate < 100 &&
                comp.homeTeam.winningRate > 0
              ) {
                comp.awayTeam.winningRate += 10;
                comp.homeTeam.winningRate -= 10;
              }
            }
          }
        });
        return updatedCompetitions;
      });
    }, 1000);

    return () => clearInterval(updateScoreInterval.current);
  }, []);
  // clear all intervas when all matches are finished
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
                    awayTeam: { score, name, countryCode, winningRate },
                    homeTeam: {
                      score: homeScore,
                      name: homeName,
                      countryCode: homeCountryCode,
                      winningRate: homewinningRate,
                    },
                  }) => (
                    <React.Fragment key={gameId}>
                      <Grid container marginY={1} alignItems={"center"}>
                        <Grid item xs={4}>
                          <Grid container>
                            <Grid item flex={1}>
                              <img
                                src={`https://flagcdn.com/${homeCountryCode}.svg`}
                                width="50"
                                alt={`${homeName}`}
                              />
                            </Grid>
                            <Grid item flex={1}>
                              <Typography>
                                {homeName}
                                <br /> {homewinningRate}%
                              </Typography>
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
                              {startedGame ? "playing" : ""}
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={4}>
                          <Grid container>
                            <Grid item flex={1}>
                              <Typography>
                                {name} <br /> {winningRate}%
                              </Typography>
                            </Grid>
                            <Grid item flex={1}>
                              <img
                                src={`https://flagcdn.com/${countryCode}.svg`}
                                width="50"
                                alt={`${name}`}
                              />
                            </Grid>
                          </Grid>{" "}
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
                    awayTeam: { score, name, countryCode },
                    homeTeam: {
                      score: homeScore,
                      name: homeName,
                      countryCode: homeCountryCode,
                    },
                  }) => (
                    <>
                      <Grid
                        container
                        key={gameId}
                        marginY={2}
                        alignItems={"center"}
                      >
                        <Grid item xs={4}>
                          <Grid container>
                            <Grid item flex={1}>
                              <img
                                src={`https://flagcdn.com/${homeCountryCode}.svg`}
                                width="50"
                                alt={`${homeName}`}
                              />
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
                              {!startedGame ? "finished" : null}
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={4}>
                          <Grid container>
                            <Grid item flex={1}>
                              <Typography>{name}</Typography>
                            </Grid>
                            <Grid item flex={1}>
                              <img
                                src={`https://flagcdn.com/${countryCode}.svg`}
                                width="50"
                                alt={`${name}`}
                              />
                            </Grid>
                          </Grid>{" "}
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

export default ScoreBoard;
