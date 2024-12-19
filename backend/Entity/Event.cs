namespace EventManagementApi.Entity;
public class Event
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public string Date { get; set; } = string.Empty;
    public Guid OrganizerId { get; set; }
    public List<Guid> Attendees { get; set; } = new List<Guid>();
}
