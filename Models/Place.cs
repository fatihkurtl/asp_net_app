using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Places
{
    [Key]
    public int PlaceId { get; set; }

    [Required]
    public string PlaceName { get; set; }

    // Adres ID'si opsiyonel
    public int? AddressId { get; set; }

    // Adres detayları opsiyonel
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

    // Bu adrese bağlı olan yerlerin listesi
    public ICollection<Places>? Places { get; set; }
}



