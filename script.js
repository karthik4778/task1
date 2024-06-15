// DOM elements
const resumeForm = document.getElementById("resume-form");
const templateList = document.getElementById("template-list");
const previewButton = document.getElementById("preview-button");
const previewContainer = document.getElementById("preview");
const downloadButton = document.getElementById("download-button");
const addEducationButton = document.getElementById("add-education");
const addExperienceButton = document.getElementById("add-experience");

// Function to apply selected template
function applyTemplate(templateClass) {
    previewContainer.className = '';
    previewContainer.classList.add(templateClass);
}

// Event listener to apply selected template
templateList.addEventListener("click", (e) => {
    if (e.target && e.target.tagName === 'A') {
        const selectedTemplate = e.target.getAttribute("data-template");
        applyTemplate(selectedTemplate);
    }
});

// Function to generate the preview
previewButton.addEventListener("click", () => {
    // Gather form data and create a preview
    const personalInfo = getPersonalInfo();
    const educationInfo = getEducationInfo();
    const workExperience = getWorkExperience();

    const previewHTML = `
        <h2>Preview</h2>
        <div>
            <h3>Personal Information</h3>
            ${personalInfo}
        </div>
        <div>
            <h3>Education</h3>
            ${educationInfo}
        </div>
        <div>
            <h3>Work Experience</h3>
            ${workExperience}
        </div>
    `;

    previewContainer.innerHTML = previewHTML;
});

// Function to download the resume
downloadButton.addEventListener("click", () => {
    const resumeContent = previewContainer.innerHTML;
    const blob = new Blob([resumeContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resume.html";
    a.click();
    URL.revokeObjectURL(url);
});

// Function to add education fields dynamically
addEducationButton.addEventListener("click", () => {
    const educationItem = document.createElement('div');
    educationItem.classList.add('education-item');
    educationItem.innerHTML = `
        <input type="text" class="institution" placeholder="Institution">
        <input type="text" class="degree" placeholder="Degree">
        <input type="text" class="year" placeholder="Year">
    `;
    resumeForm.insertBefore(educationItem, addEducationButton);
});

// Function to add work experience fields dynamically
addExperienceButton.addEventListener("click", () => {
    const experienceItem = document.createElement('div');
    experienceItem.classList.add('experience-item');
    experienceItem.innerHTML = `
        <input type="text" class="company" placeholder="Company">
        <input type="text" class="job-title" placeholder="Job Title">
        <textarea class="experience-description" placeholder="Description"></textarea>
    `;
    resumeForm.insertBefore(experienceItem, addExperienceButton);
});

// Function to get personal information
function getPersonalInfo() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

    const personalInfoHTML = `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
    `;

    return personalInfoHTML;
}

// Function to get education information
function getEducationInfo() {
    const educationList = document.querySelectorAll(".education-item");

    let educationInfoHTML = '';
    educationList.forEach((educationItem, index) => {
        const institution = educationItem.querySelector(".institution").value;
        const degree = educationItem.querySelector(".degree").value;
        const year = educationItem.querySelector(".year").value;

        educationInfoHTML += `
            <p><strong>Education ${index + 1}:</strong></p>
            <p><strong>Institution:</strong> ${institution}</p>
            <p><strong>Degree:</strong> ${degree}</p>
            <p><strong>Year:</strong> ${year}</p>
        `;
    });

    return educationInfoHTML;
}

// Function to get work experience
function getWorkExperience() {
    const experienceList = document.querySelectorAll(".experience-item");

    let experienceInfoHTML = '';
    experienceList.forEach((experienceItem, index) => {
        const company = experienceItem.querySelector(".company").value;
        const jobTitle = experienceItem.querySelector(".job-title").value;
        const experienceDescription = experienceItem.querySelector(".experience-description").value;

        experienceInfoHTML += `
            <p><strong>Experience ${index + 1}:</strong></p>
            <p><strong>Company:</strong> ${company}</p>
            <p><strong>Job Title:</strong> ${jobTitle}</p>
            <p><strong>Description:</strong> ${experienceDescription}</p>
        `;
    });

    return experienceInfoHTML;
}