package handlers

import (
	"github.com/gofiber/fiber/v2"
	"CRUD_NEXTJS_GOLANG/models"
	"strconv"
)

func GetUsers(c *fiber.Ctx) error {
	users, err := models.GetUsers()
	if err != nil {
		return c.Status(500).SendString("Error fetching users")
	}
	return c.JSON(users)
}

func CreateUser(c *fiber.Ctx) error {
	var user models.User
	if err := c.BodyParser(&user); err != nil {
		return c.Status(400).SendString("Invalid input")
	}
	if err := models.CreateUser(user); err != nil {
		return c.Status(500).SendString("Error creating user")
	}
	return c.Status(201).SendString("User created successfully")
}

func UpdateUser(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.Status(400).SendString("Invalid ID")
	}

	var user models.User
	if err := c.BodyParser(&user); err != nil {
		return c.Status(400).SendString("Invalid input")
	}

	user.ID = id
	if err := models.UpdateUser(user); err != nil {
		return c.Status(500).SendString("Error updating user")
	}
	return c.SendString("User updated successfully")
}

func DeleteUser(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.Status(400).SendString("Invalid ID")
	}

	if err := models.DeleteUser(id); err != nil {
		return c.Status(500).SendString("Error deleting user")
	}
	return c.SendString("User deleted successfully")
}