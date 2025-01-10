function sortTable(columnIndex) {
    var table = document.getElementById("supplierTable");
    var switching = true;
    var shouldSwitch, rows, i, x, y;
    var direction = "asc"; 
    var switchCount = 0;

    // Clear existing sort indicators
    var headers = table.getElementsByTagName("TH");
    for (let h = 0; h < headers.length; h++) {
        headers[h].classList.remove("sort-asc", "sort-desc");
    }

    while (switching) {
        switching = false;
        rows = table.rows;

        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[columnIndex];
            y = rows[i + 1].getElementsByTagName("TD")[columnIndex];

            // Compare two rows based on the current column
            if (direction === "asc") {
                if (isNaN(x.innerHTML)) {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                } else {
                    if (parseFloat(x.innerHTML) > parseFloat(y.innerHTML)) {
                        shouldSwitch = true;
                        break;
                    }
                }
            } else if (direction === "desc") {
                if (isNaN(x.innerHTML)) {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                } else {
                    if (parseFloat(x.innerHTML) < parseFloat(y.innerHTML)) {
                        shouldSwitch = true;
                        break;
                    }
                }
            }
        }

        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchCount++;
        } else {
            if (switchCount === 0 && direction === "asc") {
                direction = "desc";
                switching = true;
            }
        }
    }

    // Add the appropriate sort class to the header
    if (direction === "asc") {
        headers[columnIndex].classList.add("sort-asc");
    } else {
        headers[columnIndex].classList.add("sort-desc");
    }
}



// Function to check the number of selected checkboxes
function updateCompareButton() {
    var checkboxes = document.querySelectorAll('.supplier-checkbox');
    var compareButton = document.getElementById('compareButton');
    var checkedCount = 0;

    checkboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
            checkedCount++;
        }
    });

    // Enable the button only if more than 1 checkbox is checked
    if (checkedCount > 1) {
        compareButton.disabled = false;
        compareButton.classList.add('glowing'); // Add glowing effect when 2 or more are selected
    } else {
        compareButton.disabled = true;
        compareButton.classList.remove('glowing'); // Remove glowing effect when less than 2 are selected
    }
}



// Attach event listeners to checkboxes
var checkboxes = document.querySelectorAll('.supplier-checkbox');
checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener('change', function (event) {
        event.stopPropagation(); // Prevent the click event from propagating
        updateCompareButton();
    });
});


// // Function to initialize the table sorting on page load
// document.addEventListener("DOMContentLoaded", function () {
//     // Sort by the first column (index 0) in ascending order by default
//     sortTable(0);
// });

document.addEventListener("DOMContentLoaded", function () {
    // Add event listener for supplier names (click on the first column only)
    document.querySelectorAll("#supplierTable td").forEach(function (cell) {
        cell.addEventListener("click", function (event) {
            // Prevent navigation if the click is on a checkbox
            if (event.target.tagName.toLowerCase() === 'input' && event.target.type === 'checkbox') {
                return; // Do nothing for checkbox clicks
            }

            // Get supplier name from the row's data attribute
            const supplierName = event.target.closest("tr").dataset.supplier;
            navigateToDetailsPage(supplierName);
        });
    });

    // Function to navigate to the details page
    function navigateToDetailsPage(supplierName) {
        // Redirect to a new page with supplier data in query string
        window.location.href = `details.html?supplier=${encodeURIComponent(supplierName)}`;
    }
});




function openTab(tabId) {
    const tabs = document.querySelectorAll('.tab-content');
    const buttons = document.querySelectorAll('.tab-button');

    tabs.forEach(tab => tab.classList.add('hidden'));
    buttons.forEach(button => button.classList.remove('active'));

    document.getElementById(tabId).classList.remove('hidden');
    document.querySelector(`[onclick="openTab('${tabId}')"]`).classList.add('active');
}

document.addEventListener("DOMContentLoaded", function () {
    // Random data generator
    function getRandomData(count, min, max) {
        return Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1)) + min);
    }

    // Graph 1: Line Chart for Supplier Data Over Time
    const ctx1 = document.getElementById('graph1').getContext('2d');
    new Chart(ctx1, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], // Months
            datasets: [{
                label: 'Dobavitelj A - Sales',
                data: getRandomData(12, 10, 100), // Random data for 12 months
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            }
        }
    });

    // Graph 2: Bar Chart for Supplier Performance Metrics
    const ctx2 = document.getElementById('graph2').getContext('2d');
    new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: ['Quality', 'Delivery', 'Support', 'Price'], // Metrics
            datasets: [{
                label: 'Dobavitelj A - Performance Metrics',
                data: getRandomData(4, 50, 100), // Random data for metrics
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            }
        }
    });
});

// Function to extract the supplier name from the URL
window.onload = function() {
    // Example URL: 'supplier.html?supplier=Dobavitelj A'
    const urlParams = new URLSearchParams(window.location.search);
    const supplierName = urlParams.get('supplier') || "Dobavitelj A"; // Default to "Dobavitelj A" if not found
    document.getElementById("supplier-name").innerHTML = supplierName + ' <span class="status green"></span>';
};  

function toggleDarkMode() {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    const checkbox = document.getElementById('darkModeSwitch');
    
    if (checkbox) {
        checkbox.checked = isDarkMode;
    }

    // Optionally, save the user's preference in localStorage
    localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
}

// Check for stored preference on page load
document.addEventListener('DOMContentLoaded', () => {
    const storedMode = localStorage.getItem('darkMode');
    const checkbox = document.getElementById('darkModeSwitch');
    
    if (storedMode === 'enabled') {
        document.body.classList.remove('dark-mode');
        if (checkbox) checkbox.checked = false;
        
    } else {
        document.body.classList.add('dark-mode');
        if (checkbox) checkbox.checked = true;
    }
});

function changeTextSize(size) {
    // Remove the active class from all buttons
    document.getElementById('smallTextBtn').classList.remove('active');
    document.getElementById('normalTextBtn').classList.remove('active');
    document.getElementById('largeTextBtn').classList.remove('active');
    
    // Add the active class to the clicked button
    if (size === 'small') {
        document.getElementById('smallTextBtn').classList.add('active');
    } else if (size === 'large') {
        document.getElementById('largeTextBtn').classList.add('active');
    } else {
        document.getElementById('normalTextBtn').classList.add('active');
    }

    // Remove any existing size classes from body
    document.body.classList.remove('text-small', 'text-normal', 'text-large');
    
    // Apply the selected text size class
    document.body.classList.add(`text-${size}`);
    
    // Save the user's preference in localStorage
    localStorage.setItem('textSize', size);
}

// Check for stored preference on page load
document.addEventListener('DOMContentLoaded', () => {
    const storedMode = localStorage.getItem('darkMode');
    const checkbox = document.getElementById('darkModeSwitch');
    
    if (storedMode === 'enabled') {
        document.body.classList.add('dark-mode');
        if (checkbox) checkbox.checked = true;
    } else {
        document.body.classList.remove('dark-mode');
        if (checkbox) checkbox.checked = false;
    }
});