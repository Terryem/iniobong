function openModal(imgSrc, title, description) {
    document.getElementById('modalImg').src = imgSrc;
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalDesc').innerText = description;
    document.getElementById('photoModal').style.display = 'flex';
  }

  function closeModal() {
    document.getElementById('photoModal').style.display = 'none';
  }

  function closeModalOnOutside(event) {
    const modal = document.getElementById('photoModal');
    if (event.target === modal) {
      closeModal();
    }
  }



  const modal = document.getElementById("aboutModal");
const btn = document.getElementById("openModalBtn");
const closeBtn = document.getElementsByClassName("close-btn")[0];

// Open modal when button is clicked
btn.addEventListener("click", function() {
    modal.style.display = "flex";
    document.body.style.overflow = "hidden"; // Prevents background scrolling while modal is open
});

// Close modal when 'X' is clicked
closeBtn.addEventListener("click", function() {
    modal.style.display = "none";
    document.body.style.overflow = "auto"; // Restores background scrolling
});

// Close modal if user clicks outside the modal box
window.addEventListener("click", function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }
});