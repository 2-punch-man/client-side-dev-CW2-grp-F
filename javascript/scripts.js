document.addEventListener('DOMContentLoaded', () => {
    // Sample flight data
    const flights = [
        { id: 1, airline: 'Biman Bangladesh', from: 'DAC', to: 'LHR', departure: '2025-12-15', price: 699 },
        { id: 2, airline: 'British Airways', from: 'DAC', to: 'LHR', departure: '2025-12-15', price: 799 },
        { id: 3, airline: 'Emirates', from: 'CGP', to: 'MAN', departure: '2025-12-16', price: 849 }
    ];

    // Get DOM elements
    const searchForm = document.getElementById('searchForm');
    const flightsContainer = document.getElementById('flightsContainer');
    const bookingModal = document.getElementById('bookingModal');
    const confirmationModal = document.getElementById('confirmationModal');

    // Display flights function
    function showFlights(flightsToShow) {
        flightsContainer.innerHTML = flightsToShow.map(flight => `
            <div class="flight-card">
                <h3>${flight.airline}</h3>
                <p>${flight.from} → ${flight.to}</p>
                <p>Departure: ${flight.departure}</p>
                <p>Price: $${flight.price}</p>
                <button class="book-btn" data-id="${flight.id}">Book Now</button>
            </div>
        `).join('');
    }

    // Search form handler
    searchForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const from = document.getElementById('from').value;
        const to = document.getElementById('to').value;
        const departure = document.getElementById('departure').value;

        const filteredFlights = flights.filter(flight => 
            flight.from === from && 
            flight.to === to && 
            flight.departure === departure
        );

        showFlights(filteredFlights.length ? filteredFlights : []);
    });

    // Handle book button clicks
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('book-btn')) {
            bookingModal.style.display = 'block';
        }
        if (e.target.classList.contains('close')) {
            bookingModal.style.display = 'none';
            confirmationModal.style.display = 'none';
        }
    });

    // Handle booking form submission
    document.getElementById('bookingForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        bookingModal.style.display = 'none';
        confirmationModal.style.display = 'block';
    });

    // Show all flights when page loads
    showFlights(flights);
});
