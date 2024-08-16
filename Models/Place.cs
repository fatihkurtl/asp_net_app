using System.ComponentModel.DataAnnotations;

public class Places
{
    [Key]
    public int PlaceId { get; set; }

    [Required]
    public string PlaceName { get; set; }

    public int? AddressId { get; set; }

    public AddressDetail? Address { get; set; }
}


public class AddressDetail
{
    [Key]
    public int AddressId { get; set; }

    [Required]
    public string StreetAddress { get; set; }

    [Required]
    public string City { get; set; }

    public ICollection<Places>? Places { get; set; }
}



