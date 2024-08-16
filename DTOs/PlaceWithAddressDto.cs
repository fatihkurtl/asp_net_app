namespace asp_net_app.DTOs;

public class PlaceWithAddressDto
{
    public string? PlaceName { get; set; }
    public AddressDetailDto? Address { get; set; }
}

public class AddressDetailDto
{
    public string? StreetAddress { get; set; }
    public string? City { get; set; }
}
