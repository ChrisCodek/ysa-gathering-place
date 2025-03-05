// script.js
function showPage(pageId) {
    document.querySelectorAll('.container').forEach(div => div.classList.add('hidden'));
    document.getElementById(pageId).classList.remove('hidden');
}

document.addEventListener("DOMContentLoaded", function() {
    const memberYes = document.getElementById("memberYes");
    const memberNo = document.getElementById("memberNo");
    const wardSection = document.getElementById("wardSection");
    const form = document.getElementById("registrationForm");
    const responseMessage = document.getElementById("responseMessage");

    // Show Ward input only if "Yes" is selected
    memberYes.addEventListener("change", function() {
        wardSection.classList.remove("hidden");
        document.getElementById("ward").setAttribute("required", "true");
    });

    memberNo.addEventListener("change", function() {
        wardSection.classList.add("hidden");
        document.getElementById("ward").removeAttribute("required");
    });

    // Form Submission Handling
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission for demo

        // Show success message
        responseMessage.classList.remove("hidden");

        // Hide message after 5 seconds
        setTimeout(() => {
            responseMessage.classList.add("hidden");
        }, 7000);
    });
});

// Toggle features
document.addEventListener("DOMContentLoaded", function() {
    const computerSection = document.getElementById("computer");
    const toggleButton = document.getElementById("toggleDetails");

    toggleButton.addEventListener("click", function() {
        if (computerSection.classList.contains("hidden")) {
            computerSection.classList.remove("hidden");
            toggleButton.textContent = "Hide Details";
        } else {
            computerSection.classList.add("hidden");
            toggleButton.textContent = "Show Details";
        }
    });
});



// For the Slide show
let index = 0;
const testimonials = document.querySelectorAll(".testimonial");

function showTestimonial(n) {
    testimonials.forEach((item, i) => {
        item.classList.remove("active");
        if (i === n) item.classList.add("active");
    });
}

function prevTestimonial() {
    index = (index - 1 + testimonials.length) % testimonials.length;
    showTestimonial(index);
}

function nextTestimonial() {
    index = (index + 1) % testimonials.length;
    showTestimonial(index);
}




// For Contact
document.addEventListener("DOMContentLoaded", function () {
    const contactSection = document.getElementById("contact");

    function revealSection() {
        if (contactSection.getBoundingClientRect().top < window.innerHeight - 50) {
            contactSection.classList.add("show");
        }
    }

    window.addEventListener("scroll", revealSection);
});


// Spread Sheet Information
document.getElementById("registrationForm").addEventListener("submit", function(e) {
    e.preventDefault();

    var formData = new FormData(this);
    var object = {};
    formData.forEach((value, key) => object[key] = value);
    
    // Handling radio button value
    object["membership"] = document.querySelector('input[name="membership"]:checked')?.value || "";
    
    // Ward should only be included if the user selects "Yes"
    if (object["membership"] !== "Yes") {
      object["ward"] = "";
    }

    var json = JSON.stringify(object);

    fetch("https://script.google.com/macros/s/AKfycbw2_Nu9-4xFeDH8B4XMAffXGwIt3FLCISCkarknjRakRxcOpxwt3ONlPUgA7rkt0Nlz/exec", {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: json
    }).then(() => {
      document.getElementById("responseMessage").classList.remove("hidden");
      document.getElementById("registrationForm").reset();
    }).catch(error => console.error("Error:", error));
  });

  // Show ward section only if user selects "Yes"
  document.querySelectorAll('input[name="membership"]').forEach(radio => {
    radio.addEventListener("change", function() {
      document.getElementById("wardSection").classList.toggle("hidden", this.value !== "Yes");
    });
  });