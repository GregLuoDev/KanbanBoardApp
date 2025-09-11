using System.ComponentModel.DataAnnotations;

namespace KanbanBoard.WebAPI.Models;

public class TaskItem
{
    [Key]
    public Guid Id { get; set; }

    [Required, MaxLength(100)]
    public string Title { get; set; } = string.Empty;

    [MaxLength(1000)]
    public string? Description { get; set; }

    [Required]
    public TaskStatusEnum Status { get; set; } = TaskStatusEnum.ToDo;

    public DateTimeOffset CreatedAt { get; set; }
    public DateTimeOffset UpdatedAt { get; set; }
}
