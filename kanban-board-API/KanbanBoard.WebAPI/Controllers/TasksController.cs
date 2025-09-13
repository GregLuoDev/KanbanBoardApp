using KanbanBoard.WebAPI.Database;
using KanbanBoard.WebAPI.DTOs;
using KanbanBoard.WebAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace KanbanBoard.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly KanbanDbContext _context;

        public TasksController(KanbanDbContext context)
        {
            _context = context;
        }

        // GET: api/Tasks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskItem>>> GetTasks()
        {
            try
            {
                var tasks = await _context.Tasks.ToListAsync();
                return Ok(tasks);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error happens when retrieving tasks: {ex.Message}");
            }
        }

        // GET: api/Tasks/3846bd70-a0c3-4079-879d-eea95554834c
        [HttpGet("{id}")]
        public async Task<ActionResult<TaskItem>> GetTaskItem(Guid id)
        {
            try
            {
                var taskItem = await _context.Tasks.FindAsync(id);

                if (taskItem == null)
                {
                    return NotFound($"Task with ID {id} not found.");
                }

                return Ok(taskItem);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error happens when retrieving task: {ex.Message}");
            }
        }

        // PUT: api/Tasks/3846bd70-a0c3-4079-879d-eea95554834c
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTaskItem(Guid id, TaskItemDto taskItemDto)
        {
            if (taskItemDto is null)
            {
                return BadRequest("Task cannot be null.");
            }

            try
            {
                var entity = await _context.Tasks.FindAsync(id);
                if (entity is null)
                { 
                    return NotFound($"Task with ID {id} not found."); 
                }

                entity.Title = taskItemDto.Title;
                entity.Description = taskItemDto.Description;
                entity.Status = taskItemDto.Status;

                _context.Entry(entity).State = EntityState.Modified;

                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TaskItemExists(id))
                    return NotFound($"Task with ID {id} no longer exists.");

                throw;
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error happens when updating task: {ex.Message}");
            }
        }

        // POST: api/Tasks
        [HttpPost]
        public async Task<ActionResult<TaskItem>> PostTaskItem(TaskItemDto taskItemDto)
        {
            if (taskItemDto is null)
            {
                return BadRequest("Task data cannot be null.");
            }

            try
            {
                var entity = new TaskItem
                {
                    Title = taskItemDto.Title,
                    Description = taskItemDto.Description,
                    Status = taskItemDto.Status
                };

                _context.Tasks.Add(entity);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetTaskItem), new { id = entity.Id }, entity);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error happens when creating task: {ex.Message}");
            }
        }

        // DELETE: api/Tasks/3846bd70-a0c3-4079-879d-eea95554834c
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTaskItem(Guid id)
        {
            try
            {
                var taskItem = await _context.Tasks.FindAsync(id);
                if (taskItem == null)
                {
                    return NotFound($"Task with ID {id} not found.");
                }

                _context.Tasks.Remove(taskItem);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error happens when deleting task: {ex.Message}");
            }
        }

        private bool TaskItemExists(Guid id)
        {
            return _context.Tasks.Any(e => e.Id == id);
        }
    }
}
