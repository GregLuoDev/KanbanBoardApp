using FluentAssertions;
using KanbanBoard.WebAPI.Controllers;
using KanbanBoard.WebAPI.Database;
using KanbanBoard.WebAPI.DTOs;
using KanbanBoard.WebAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

public class TasksControllerTests
{
    private KanbanDbContext GetDbContext()
    {
        var options = new DbContextOptionsBuilder<KanbanDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;

        var context = new KanbanDbContext(options);
        context.Tasks.Add(new TaskItem
        {
            Id = Guid.NewGuid(),
            Title = "Test Task",
            Description = "Test Description",
            Status = TaskStatusEnum.ToDo
        });
        context.SaveChanges();
        return context;
    }

    [Fact]
    public async Task GetTasks_ShouldReturnAllTasks()
    {
        // Arrange
        var context = GetDbContext();
        var controller = new TasksController(context);

        // Act
        var result = await controller.GetTasks();

        // Assert
        result.Value.Should().NotBeNull();
        result.Value.Should().HaveCount(1);
    }

    [Fact]
    public async Task GetTaskItem_ShouldReturnTask_WhenIdExists()
    {
        // Arrange
        var context = GetDbContext();
        var task = context.Tasks.First();
        var controller = new TasksController(context);

        // Act
        var result = await controller.GetTaskItem(task.Id);

        // Assert
        result.Value.Should().NotBeNull();
        result.Value.Id.Should().Be(task.Id);
    }

    [Fact]
    public async Task GetTaskItem_ShouldReturnNotFound_WhenIdDoesNotExist()
    {
        // Arrange
        var context = GetDbContext();
        var controller = new TasksController(context);

        // Act
        var result = await controller.GetTaskItem(Guid.NewGuid());

        // Assert
        result.Result.Should().BeOfType<NotFoundResult>();
    }

    [Fact]
    public async Task PostTaskItem_ShouldAddTaskAndReturnCreated()
    {
        // Arrange
        var context = GetDbContext();
        var controller = new TasksController(context);
        var dto = new TaskItemDto
        {
            Title = "New Task",
            Description = "New Description",
            Status = TaskStatusEnum.Done
        };

        // Act
        var result = await controller.PostTaskItem(dto);

        // Assert
        var createdResult = result.Result as CreatedAtActionResult;
        createdResult.Should().NotBeNull();
        createdResult!.Value.Should().BeOfType<TaskItem>();
        context.Tasks.Count().Should().Be(2);
    }

    [Fact]
    public async Task PutTaskItem_ShouldUpdateTask_WhenIdExists()
    {
        // Arrange
        var context = GetDbContext();
        var task = context.Tasks.First();
        var controller = new TasksController(context);
        var dto = new TaskItemDto
        {
            Title = "Updated Task",
            Description = "Updated Description",
            Status = TaskStatusEnum.InProgress
        };

        // Act
        var result = await controller.PutTaskItem(task.Id, dto);

        // Assert
        result.Should().BeOfType<NoContentResult>();
        var updatedTask = context.Tasks.Find(task.Id);
        updatedTask!.Title.Should().Be("Updated Task");
    }

    [Fact]
    public async Task PutTaskItem_ShouldReturnNotFound_WhenIdDoesNotExist()
    {
        // Arrange
        var context = GetDbContext();
        var controller = new TasksController(context);
        var dto = new TaskItemDto
        {
            Title = "Updated Task",
            Description = "Updated Description",
            Status = TaskStatusEnum.InProgress
        };

        // Act
        var result = await controller.PutTaskItem(Guid.NewGuid(), dto);

        // Assert
        result.Should().BeOfType<NotFoundResult>();
    }

    [Fact]
    public async Task DeleteTaskItem_ShouldRemoveTask_WhenIdExists()
    {
        // Arrange
        var context = GetDbContext();
        var task = context.Tasks.First();
        var controller = new TasksController(context);

        // Act
        var result = await controller.DeleteTaskItem(task.Id);

        // Assert
        result.Should().BeOfType<NoContentResult>();
        context.Tasks.Any(t => t.Id == task.Id).Should().BeFalse();
    }

    [Fact]
    public async Task DeleteTaskItem_ShouldReturnNotFound_WhenIdDoesNotExist()
    {
        // Arrange
        var context = GetDbContext();
        var controller = new TasksController(context);

        // Act
        var result = await controller.DeleteTaskItem(Guid.NewGuid());

        // Assert
        result.Should().BeOfType<NotFoundResult>();
    }
}
