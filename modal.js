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