using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Places
{
    [Key]
    public int PlaceId { get; set; }

    [Required]
    public string PlaceName { get; set; }

    public int? AddressId { get; set; }

    public AddressDetail? Address { get; set; }

    [DataType(DataType.DateTime)]
    [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
    [DatabaseGenerated(DatabaseGeneratedOption.None)]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [DataType(DataType.DateTime)]
    [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
    [DatabaseGenerated(DatabaseGeneratedOption.None)]
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

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

    [DataType(DataType.DateTime)]
    [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
    [DatabaseGenerated(DatabaseGeneratedOption.None)]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [DataType(DataType.DateTime)]
    [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
    [DatabaseGenerated(DatabaseGeneratedOption.None)]
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}



