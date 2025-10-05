// Content loader for EDM Dashboard
async function loadContent(fileName) {
    try {
        const response = await fetch(`content/${fileName}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const content = await response.text();
        return content;
    } catch (error) {
        console.error("Error loading content:", error);
        return "Error loading content. Please try again.";
    }
}

// Function to load problem definition content
async function loadProblemDefinition() {
    try {
        const content = await loadContent("ask-problem-definition.txt");
        // Get the pre element inside the problem definition preview
        const preElements = document.querySelectorAll('pre#problem-definition-content');
        if (preElements.length > 0) {
            // Use the last one (the one in the file preview section)
            preElements[preElements.length - 1].innerHTML = marked.parse(content);
        }
    } catch (error) {
        console.error("Error loading problem definition:", error);
    }
}

// Function to load stakeholder analysis content
async function loadStakeholderAnalysis() {
    try {
        const content = await loadContent("ask-stakeholder-analysis.txt");
        const stakeholderContainer = document.getElementById("stakeholder-analysis-content");
        if (stakeholderContainer) {
            stakeholderContainer.innerHTML = marked.parse(content);
        }
    } catch (error) {
        console.error("Error loading stakeholder analysis:", error);
    }
}

// Load stakeholder analysis when the page loads
document.addEventListener('DOMContentLoaded', function() {
    loadStakeholderAnalysis();
});

// Function to load success criteria content
async function loadSuccessCriteria() {
    try {
        const content = await loadContent("ask-success-criteria.txt");
        const successContainer = document.getElementById("success-criteria-content");
        if (successContainer) {
            successContainer.innerHTML = marked.parse(content);
        }
    } catch (error) {
        console.error("Error loading success criteria:", error);
    }
}

// Function to update last modified date
function updateLastModifiedDate() {
    const dateElement = document.querySelector('.student-info div:last-child');
    if (dateElement) {
        const today = new Date();
        const formattedDate = `${today.getMonth() + 1}/${today.getDate()}/${String(today.getFullYear()).slice(-2)}`;
        dateElement.innerHTML = `<strong>Last Updated:</strong> ${formattedDate}`;
    }
}

// Function to monitor content changes
function setupContentChangeMonitor() {
    // Monitor changes to content files
    const contentObserver = new MutationObserver(() => {
        updateLastModifiedDate();
    });

    // Observe all content containers
    const containers = [
        document.getElementById('problem-definition-content'),
        document.getElementById('stakeholder-analysis-content'),
        document.getElementById('success-criteria-content')
    ];

    containers.forEach(container => {
        if (container) {
            contentObserver.observe(container, { 
                childList: true, 
                subtree: true, 
                characterData: true 
            });
        }
    });
}

// Function to load scientific methods content
async function loadScientificMethods() {
    try {
        const content = await loadContent("evidence-scientific-methods.txt");
        const methodsContainer = document.querySelector('.evidence-section pre');
        if (methodsContainer) {
            methodsContainer.innerHTML = marked.parse(content);
        }
    } catch (error) {
        console.error("Error loading scientific methods:", error);
    }
}

// Initialize content loading
document.addEventListener("DOMContentLoaded", async () => {
    // Load all content when the page loads
    await loadProblemDefinition();
    await loadStakeholderAnalysis();
    await loadSuccessCriteria();
    await loadScientificMethods();
    
    // Setup change monitoring
    setupContentChangeMonitor();
    
    // Initial date update
    updateLastModifiedDate();
});
