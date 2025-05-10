package handlers

import (
	"github.com/gofiber/fiber/v2"
	"CRUD_Nextjs_Golang/backend/database"
	
)

func GetUsers(c *fiber.Ctx) error {
	rows, err := database.DB.Query("SELECT ID, Name, Email, Age FROM Users")
	if err != nil {
		return err
	}
	defer rows.Close()

	var users []models.User
	for rows.Next() {
		var user models.User
		rows.Scan(&user.ID, &user.Name, &user.Email, &user.Age)
		users = append(users, user)
	}
	return c.JSON(users)
}

func CreateUser(c *fiber.Ctx) error {
	var user models.User
	if err := c.BodyParser(&user); err != nil {
		return err
	}
	_, err := database.DB.Exec("INSERT INTO Users (Name, Email, Age) VALUES (?, ?, ?)", user.Name, user.Email, user.Age)
	if err != nil {
		return err
	}
	return c.SendStatus(fiber.StatusCreated)
}
