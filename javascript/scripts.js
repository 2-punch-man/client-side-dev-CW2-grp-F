document.addEventListener('DOMContentLoaded', () => {
    const flights = [
        { id: 1, airline: 'Biman Bangladesh', from: 'DAC', to: 'LHR', departure: '2025-12-15', price: 699 },
        { id: 2, airline: 'British Airways', from: 'DAC', to: 'LHR', departure: '2025-12-15', price: 799 },
        { id: 3, airline: 'Emirates', from: 'CGP', to: 'MAN', departure: '2025-12-16', price: 849 },
        { id: 4, airline: 'Qatar Airways', from: 'DAC', to: 'LHR', departure: '2025-12-17', price: 899 },
        { id: 5, airline: 'Turkish Airlines', from: 'CGP', to: 'MAN', departure: '2025-12-18', price: 759 },
        { id: 6, airline: 'Etihad Airways', from: 'DAC', to: 'LHR', departure: '2025-12-19', price: 819 }
    ];

    const searchForm = document.getElementById('searchForm');
    const flightsContainer = document.getElementById('flightsContainer');
    const bookingModal = document.getElementById('bookingModal');
    const confirmationModal = document.getElementById('confirmationModal');

    // Smooth scroll implementation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    // Apply animations to cards
     const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                requestAnimationFrame(() => {
                    entry.target.style.transition = `
                        opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 50}ms,
                        transform 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 50}ms
                    `;
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                });
            }
        });
    }, { threshold: 0.1 });
    
    function displayFlights(list) {
        flightsContainer.innerHTML = list.map(flight => `
            <div class="flight-card">
                <div class="flight-info">
                    <h3>${flight.airline}</h3>
                    <p>${flight.from} → ${flight.to}</p>
                    <p>${flight.departure}</p>
                </div>
                <div class="flight-price">
                    $${flight.price}
                    <button class="btn book-btn" data-id="${flight.id}">Book Now</button>
                </div>
            </div>
        `).join('');
    }

    searchForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        flightsContainer.innerHTML = `<div class="loading"></div>`;
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const from = document.getElementById('from').value;
        const to = document.getElementById('to').value;
        const departure = document.getElementById('departure').value;

        const filtered = flights.filter(f =>
            f.from === from && f.to === to && f.departure === departure
        );

        displayFlights(filtered.length ? filtered : []);
    });

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('book-btn')) {
            bookingModal.style.display = 'flex';
        }
        if (e.target.classList.contains('close') || e.target === bookingModal) {
            bookingModal.style.display = 'none';
        }
    });

    document.getElementById('bookingForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        bookingModal.style.display = 'none';
        confirmationModal.style.display = 'flex';
        document.getElementById('confirmationText').textContent =
            'Your booking is confirmed! A confirmation email has been sent.';
    });

    displayFlights(flights); // Initial load
});
