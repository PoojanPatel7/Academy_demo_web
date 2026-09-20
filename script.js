document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            // Toggle icon between bars and times
            const icon = mobileMenuBtn.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            }
        });

        // Close menu when a link is clicked
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            });
        });
    }

    // 2. Sticky Navbar Styling on Scroll
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('nav-scrolled');
        } else {
            navbar.classList.remove('nav-scrolled');
        }
    });

    // 3. Counter Animation for Stats
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the slower

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;

                // Lower inc to slow and higher to fast
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    // Use Intersection Observer to trigger counter animation when in view
    const statsSection = document.querySelector('.stat-card')?.parentElement;
    if (statsSection) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }

    // Programs Scroll Spy functionality removed.
});

    // 4. Custom Dropdown Logic
    window.toggleDropdown = function(e) {
        if(e) e.stopPropagation();
        const menu = document.getElementById('dropdown-menu');
        const chevron = document.getElementById('dropdown-chevron');
        const button = document.getElementById('dropdown-button');
        const label = document.getElementById('dropdown-label');
        const icon = document.getElementById('dropdown-icon');
        
        // Toggle visibility and animation classes
        if (menu.classList.contains('opacity-0')) {
            // Open
            menu.classList.remove('opacity-0', 'invisible', '-translate-y-2');
            chevron.classList.add('rotate-180');
            button.classList.add('border-purple-500', 'ring-4', 'ring-purple-500/10', 'bg-white');
            button.classList.remove('bg-gray-50');
            label.classList.add('text-purple-600');
            icon.classList.add('text-purple-500');
            icon.classList.remove('text-gray-400');
        } else {
            // Close
            closeDropdown();
        }
    };

    window.closeDropdown = function() {
        const menu = document.getElementById('dropdown-menu');
        if (!menu) return;
        const chevron = document.getElementById('dropdown-chevron');
        const button = document.getElementById('dropdown-button');
        const label = document.getElementById('dropdown-label');
        const icon = document.getElementById('dropdown-icon');
        
        menu.classList.add('opacity-0', 'invisible', '-translate-y-2');
        chevron.classList.remove('rotate-180');
        
        // Only remove active styling if nothing is selected yet
        if(document.getElementById('dropdown-text').innerText === 'Select a program...') {
            button.classList.remove('border-purple-500', 'ring-4', 'ring-purple-500/10', 'bg-white');
            button.classList.add('bg-gray-50');
            label.classList.remove('text-purple-600');
            icon.classList.remove('text-purple-500');
            icon.classList.add('text-gray-400');
        }
    };

    window.selectProgram = function(programName) {
        document.getElementById('dropdown-text').innerText = programName;
        document.getElementById('dropdown-text').classList.remove('text-gray-400');
        document.getElementById('dropdown-text').classList.add('text-gray-900');
        document.getElementById('selected-program').value = programName;
        
        // Keep purple active styling since an option is selected
        const button = document.getElementById('dropdown-button');
        const label = document.getElementById('dropdown-label');
        const icon = document.getElementById('dropdown-icon');
        
        button.classList.add('border-purple-500', 'bg-white');
        button.classList.remove('bg-gray-50');
        label.classList.add('text-purple-600');
        icon.classList.add('text-purple-500');
        icon.classList.remove('text-gray-400');
        
        closeDropdown();
    };

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        const container = document.getElementById('custom-dropdown-container');
        if (container && !container.contains(e.target)) {
            closeDropdown();
        }
    });

