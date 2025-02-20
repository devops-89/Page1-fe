import React, { useState } from "react";
import { Card, CardMedia, CardContent, Typography, Button, Grid, IconButton } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

const meals = [
  { id: 1, name: "Paneer Tikka Sandwich + beverage", type: "veg", image: "paneer_sandwich.jpg", price: "Free" },
  { id: 2, name: "Chicken Junglee Sandwich + beverage", type: "nonveg", image: "chicken_sandwich.jpg", price: "Free" },
  { id: 3, name: "6E Eats choice of the day (veg) + beverage", type: "veg", image: "6e_eats.jpg", price: "Free" },
];

const MealSelection = () => {
  const [selectedMeals, setSelectedMeals] = useState({});

  const handleAdd = (id) => {
    setSelectedMeals((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const handleRemove = (id) => {
    setSelectedMeals((prev) => {
      const updated = { ...prev };
      if (updated[id] > 1) updated[id] -= 1;
      else delete updated[id];
      return updated;
    });
  };

  return (
    <Grid container spacing={2}>
      {meals.map((meal) => (
        <Grid item xs={12} sm={6} md={4} key={meal.id}>
          <Card>
            <CardMedia component="img" height="140" image={meal.image} alt={meal.name} />
            <CardContent>
              <Typography variant="h6">{meal.name}</Typography>
              <Typography variant="body2" color="textSecondary">{meal.price}</Typography>
              <div style={{ display: "flex", alignItems: "center", marginTop: 8 }}>
                {selectedMeals[meal.id] ? (
                  <>
                    <IconButton onClick={() => handleRemove(meal.id)}>
                      <Remove />
                    </IconButton>
                    <Typography>{selectedMeals[meal.id]}</Typography>
                    <IconButton onClick={() => handleAdd(meal.id)}>
                      <Add />
                    </IconButton>
                  </>
                ) : (
                  <Button variant="contained" onClick={() => handleAdd(meal.id)}>ADD</Button>
                )}
              </div>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default MealSelection;
