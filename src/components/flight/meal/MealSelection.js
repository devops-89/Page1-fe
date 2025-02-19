import React from "react";
import { Card, CardContent, Typography, Grid2, Container } from "@mui/material";

const meals = [
  { Code: "AVML", Description: "VEGETARIAN HINDU MEAL" },
  { Code: "BBML", Description: "BABY MEAL" },
  { Code: "DBML", Description: "DIABETIC MEAL" },
  { Code: "HNML", Description: "HINDU (NON VEGETARIAN) MEAL" },
  { Code: "MOML", Description: "MUSLIM MEAL" },
  { Code: "SFML", Description: "SEA FOOD MEAL" },
  { Code: "VGML", Description: "VEGETARIAN VEGAN MEAL" },
  { Code: "VJML", Description: "VEGETARIAN INDIAN MEAL" },
];

const MealComponent = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Airline Meal Options
      </Typography>
      <Grid2 container spacing={3}>
        {meals.map((meal) => (
          <Grid2 item xs={12} sm={6} md={4} key={meal.Code}>
            <Card sx={{ bgcolor: "#f5f5f5", p: 2, borderRadius: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" color="primary">
                  {meal.Code}
                </Typography>
                <Typography variant="body1">{meal.Description}</Typography>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
};

export default MealComponent;
