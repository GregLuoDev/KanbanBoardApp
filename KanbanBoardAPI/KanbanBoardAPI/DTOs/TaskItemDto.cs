using KanbanBoard.WebAPI.Models;
using System.ComponentModel.DataAnnotations;

namespace KanbanBoard.WebAPI.DTOs;

public class TaskItemDto
{
    [Required, MaxLength(100)]
    public string Title { get; set; }

    [MaxLength(1000)]
    public string? Description { get; set; }

    [Required]
    public TaskStatusEnum Status { get; set; } = TaskStatusEnum.ToDo;
}
