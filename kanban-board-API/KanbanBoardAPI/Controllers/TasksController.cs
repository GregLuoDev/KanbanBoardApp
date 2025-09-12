using KanbanBoard.WebAPI.Database;
using KanbanBoard.WebAPI.DTOs;
using KanbanBoard.WebAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
            return await _context.Tasks
                .OrderByDescending(t => t.UpdatedAt)
                .ToListAsync();
        }

        // GET: api/Tasks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TaskItem>> GetTaskItem(Guid id)
        {
            var taskItem = await _context.Tasks.FindAsync(id);

            if (taskItem == null)
            {
                return NotFound();
            }

            return taskItem;
        }

        // PUT: api/Tasks/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTaskItem(Guid id, TaskItemDto taskItemDto)
        {
            var entity = await _context.Tasks.FindAsync(id);
            if (entity is null) return NotFound();

            entity.Title = taskItemDto.Title;
            entity.Description = taskItemDto.Description;
            entity.Status = taskItemDto.Status;
           
            _context.Entry(entity).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TaskItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Tasks
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TaskItem>> PostTaskItem(TaskItemDto taskItemDto)
        {
            var entity = new TaskItem
            {
                Title = taskItemDto.Title,
                Description = taskItemDto.Description,
                Status = taskItemDto.Status
            };
            _context.Tasks.Add(entity);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTaskItem", new { id = entity.Id }, entity);
        }

        // DELETE: api/Tasks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTaskItem(Guid id)
        {
            var taskItem = await _context.Tasks.FindAsync(id);
            if (taskItem == null)
            {
                return NotFound();
            }

            _context.Tasks.Remove(taskItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TaskItemExists(Guid id)
        {
            return _context.Tasks.Any(e => e.Id == id);
        }
    }
}
