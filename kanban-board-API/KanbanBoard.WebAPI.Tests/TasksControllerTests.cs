using KanbanBoard.WebAPI.Controllers;
using KanbanBoard.WebAPI.Database;
using KanbanBoard.WebAPI.DTOs;
using KanbanBoard.WebAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace KanbanBoard.WebAPI.Tests
{
    public class TasksControllerTests
    {
        private KanbanDbContext GetInMemoryDbContext()
        {
            var options = new DbContextOptionsBuilder<KanbanDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;
            return new KanbanDbContext(options);
        }

        private TaskItemDto GetSampleDto() => new TaskItemDto
        {
            Title = "Sample Task",
            Description = "Sample Description",
            Status = TaskStatusEnum.ToDo
        };

        private TaskItem GetSampleTask() => new TaskItem
        {
            Id = Guid.NewGuid(),
            Title = "Existing Task",
            Description = "Existing Description",
            Status = TaskStatusEnum.InProgress,
            CreatedAt = DateTimeOffset.UtcNow,
            UpdatedAt = DateTimeOffset.UtcNow
        };

        [Fact]
        public async Task GetTasks_ReturnsAllTasks()
        {
            var db = GetInMemoryDbContext();
            db.Tasks.Add(GetSampleTask());
            await db.SaveChangesAsync();

            var controller = new TasksController(db);
            var result = await controller.GetTasks();

            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var tasks = Assert.IsAssignableFrom<IEnumerable<TaskItem>>(okResult.Value);
            Assert.Single(tasks);
        }

        [Fact]
        public async Task GetTaskItem_ExistingId_ReturnsTask()
        {
            var db = GetInMemoryDbContext();
            var task = GetSampleTask();
            db.Tasks.Add(task);
            await db.SaveChangesAsync();

            var controller = new TasksController(db);
            var result = await controller.GetTaskItem(task.Id);

            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var returnedTask = Assert.IsType<TaskItem>(okResult.Value);
            Assert.Equal(task.Id, returnedTask.Id);
        }

        [Fact]
        public async Task GetTaskItem_NonExistingId_ReturnsNotFound()
        {
            var db = GetInMemoryDbContext();
            var controller = new TasksController(db);

            var result = await controller.GetTaskItem(Guid.NewGuid());

            var notFound = Assert.IsType<NotFoundObjectResult>(result.Result);
            Assert.Contains("not found", notFound.Value.ToString());
        }

        [Fact]
        public async Task PostTaskItem_ValidDto_CreatesTask()
        {
            var db = GetInMemoryDbContext();
            var controller = new TasksController(db);
            var dto = GetSampleDto();

            var result = await controller.PostTaskItem(dto);

            var createdResult = Assert.IsType<CreatedAtActionResult>(result.Result);
            var task = Assert.IsType<TaskItem>(createdResult.Value);
            Assert.Equal(dto.Title, task.Title);
        }

        [Fact]
        public async Task PostTaskItem_NullDto_ReturnsBadRequest()
        {
            var db = GetInMemoryDbContext();
            var controller = new TasksController(db);

            var result = await controller.PostTaskItem(null);

            var badRequest = Assert.IsType<BadRequestObjectResult>(result.Result);
            Assert.Equal("Task data cannot be null.", badRequest.Value);
        }

        [Fact]
        public async Task PutTaskItem_ValidDto_UpdatesTask()
        {
            var db = GetInMemoryDbContext();
            var task = GetSampleTask();
            db.Tasks.Add(task);
            await db.SaveChangesAsync();

            var controller = new TasksController(db);
            var dto = new TaskItemDto
            {
                Title = "Updated Title",
                Description = "Updated Description",
                Status = TaskStatusEnum.Done
            };

            var result = await controller.PutTaskItem(task.Id, dto);

            Assert.IsType<NoContentResult>(result);
            var updatedTask = await db.Tasks.FindAsync(task.Id);
            Assert.Equal("Updated Title", updatedTask.Title);
        }

        [Fact]
        public async Task PutTaskItem_NonExistingId_ReturnsNotFound()
        {
            var db = GetInMemoryDbContext();
            var controller = new TasksController(db);

            var result = await controller.PutTaskItem(Guid.NewGuid(), GetSampleDto());

            var notFound = Assert.IsType<NotFoundObjectResult>(result);
            Assert.Contains("not found", notFound.Value.ToString());
        }

        [Fact]
        public async Task PutTaskItem_NullDto_ReturnsBadRequest()
        {
            var db = GetInMemoryDbContext();
            var controller = new TasksController(db);

            var result = await controller.PutTaskItem(Guid.NewGuid(), null);

            var badRequest = Assert.IsType<BadRequestObjectResult>(result);
            Assert.Equal("Task cannot be null.", badRequest.Value);
        }

        [Fact]
        public async Task DeleteTaskItem_ExistingId_ReturnsNoContent()
        {
            var db = GetInMemoryDbContext();
            var task = GetSampleTask();
            db.Tasks.Add(task);
            await db.SaveChangesAsync();

            var controller = new TasksController(db);
            var result = await controller.DeleteTaskItem(task.Id);

            Assert.IsType<NoContentResult>(result);
            Assert.Null(await db.Tasks.FindAsync(task.Id));
        }

        [Fact]
        public async Task DeleteTaskItem_NonExistingId_ReturnsNotFound()
        {
            var db = GetInMemoryDbContext();
            var controller = new TasksController(db);

            var result = await controller.DeleteTaskItem(Guid.NewGuid());

            var notFound = Assert.IsType<NotFoundObjectResult>(result);
            Assert.Contains("not found", notFound.Value.ToString());
        }
    }
}
