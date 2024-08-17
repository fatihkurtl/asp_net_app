using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using asp_net_app.DTOs;

using Microsoft.AspNetCore.Authorization;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class PlacesController : ControllerBase
{
    private readonly PlaceAddressDbContext _context;

    public PlacesController(PlaceAddressDbContext context)
    {
        _context = context;
    }

    // GET: api/Places
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Places>>> GetPlaces()
    {
        return await _context.Places.Include(p => p.Address).ToListAsync();
    }

    // GET: api/Places/id
    [HttpGet("{id:int}")]
    public async Task<ActionResult<Places>> GetPlace(int id)
    {
        var place = await _context.Places.Include(p => p.Address)
                                         .FirstOrDefaultAsync(p => p.PlaceId == id);

        if (place == null)
        {
            return NotFound();
        }

        return place;
    }

    // POST: api/Places/add
    [HttpPost("add")]
    public async Task<ActionResult<Places>> PostPlace([FromBody] PlaceCreateDto placeDto)
    {
        if (placeDto == null)
        {
            return BadRequest("Place cannot be null");
        }

        var place = new Places
        {
            PlaceName = placeDto.PlaceName,
            AddressId = placeDto.AddressId
        };

        _context.Places.Add(place);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetPlace), new { id = place.PlaceId }, place);
    }

    // PUT: api/Places/update/id
    [HttpPut("update/{id:int}")]
    public async Task<IActionResult> PutPlace(int id, [FromBody] PlaceWithAddressDto dto)
    {
        var existingPlace = await _context.Places.Include(p => p.Address)
                                                 .FirstOrDefaultAsync(p => p.PlaceId == id);
        if (existingPlace == null)
        {
            return NotFound();
        }

        existingPlace.PlaceName = dto.PlaceName;

        if (existingPlace.Address == null)
        {
            existingPlace.Address = new AddressDetail();
        }

        existingPlace.Address.City = dto.Address.City;
        existingPlace.Address.StreetAddress = dto.Address.StreetAddress;

        _context.Entry(existingPlace).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    // GET: api/Address
    [HttpGet("address")]
    public async Task<ActionResult<IEnumerable<AddressDetail>>> GetAddress()
    {
        return await _context.AddressDetails.Include(p => p.Places).ToListAsync();
    }    

    // DELETE: api/Places/id
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePlace(int id)
    {
        var place = await _context.Places.FindAsync(id);
        if (place == null)
        {
            return NotFound();
        }

        _context.Places.Remove(place);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    // DELETE: api/Address/id
    [HttpDelete("address/{id}")]
    public async Task<IActionResult> DeleteAddress(int id)
    {
        var address = await _context.AddressDetails.FindAsync(id);
        if (address == null)
        {
            return NotFound();
        }

        _context.AddressDetails.Remove(address);
        await _context.SaveChangesAsync();

        return NoContent();
    }

}
