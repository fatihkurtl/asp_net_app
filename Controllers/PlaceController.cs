﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

using asp_net_app.DTOs;

[Route("api/[controller]")]
[ApiController]
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

    // GET: api/Places/5
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

    // POST: api/Places
    [HttpPost]
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

    [HttpPut("{id}")]
    public async Task<IActionResult> PutPlace(int id, [FromBody] AddressCreateDto addressDto)
    {
        var existingPlace = await _context.Places.FindAsync(id);
        if (existingPlace == null)
        {
            return NotFound();
        }

        existingPlace.Address = new AddressDetail
        {
            StreetAddress = addressDto.StreetAddress,
            City = addressDto.City
        };

        _context.Entry(existingPlace).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return NoContent();
    }

}