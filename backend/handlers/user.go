package handlers

import (
	"github.com/gofiber/fiber/v2"
	"CRUD_NEXTJS_GOLANG/database"
	"CRUD_NEXTJS_GOLANG/models"
	
)

func GetUsers(c *fiber.Ctx) error {
	var users []model.User
	err := database.DB.Select(&users, "SELECT * FROM users ORDER BY id ASC")
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}
	return c.JSON(users)
}

func CreateUser(c *fiber.Ctx) error {
	var user model.User
	if err := c.BodyParser(&user); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "invalid input"})
	}
	err := database.DB.QueryRow(
		`INSERT INTO users (name, email, age) VALUES ($1, $2, $3) RETURNING id`,
		user.Name, user.Email, user.Age).Scan(&user.ID)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}
	return c.JSON(user)
}

func UpdateUser(c *fiber.Ctx) error {
	id := c.Params("id")
	var user model.User
	if err := c.BodyParser(&user); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "invalid input"})
	}
	_, err := database.DB.Exec(
		`UPDATE users SET name=$1, email=$2, age=$3 WHERE id=$4`,
		user.Name, user.Email, user.Age, id)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}
	return c.JSON(fiber.Map{"message": "updated"})
}

func DeleteUser(c *fiber.Ctx) error {
	id := c.Params("id")
	_, err := database.DB.Exec("DELETE FROM users WHERE id = $1", id)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}
	return c.JSON(fiber.Map{"message": "deleted"})
}