// ===== Avatar upload =====
const avatarImg = document.getElementById('avatar');
const changeAvatarBtn = document.getElementById('changeAvatarBtn');
const avatarInput = document.getElementById('avatarInput');

changeAvatarBtn.addEventListener('click', () => {
  avatarInput.click();
});

avatarInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
  if (!allowedTypes.includes(file.type)) {
    alert('Please select a valid image file (JPEG, PNG, GIF, WebP, or SVG).');
    avatarInput.value = '';
    return;
  }

  const maxSizeMB = 5;
  if (file.size > maxSizeMB * 1024 * 1024) {
    alert(`Image must be smaller than ${maxSizeMB} MB.`);
    avatarInput.value = '';
    return;
  }

  const reader = new FileReader();
  reader.onload = (evt) => {
    avatarImg.src = evt.target.result;
  };
  reader.onerror = () => {
    alert('Failed to read the image file. Please try again.');
  };
  reader.readAsDataURL(file);
});

// ===== Edit Profile Modal =====
const editProfileBtn = document.getElementById('editProfileBtn');
const editModal = document.getElementById('editModal');
const saveProfileBtn = document.getElementById('saveProfileBtn');
const cancelEditBtn = document.getElementById('cancelEditBtn');
const profileName = document.getElementById('profileName');
const profileBio = document.getElementById('profileBio');
const editName = document.getElementById('editName');
const editBio = document.getElementById('editBio');

function openModal() {
  editName.value = profileName.textContent;
  editBio.value = profileBio.textContent;
  editModal.removeAttribute('hidden');
  editName.focus();
}

function closeModal() {
  editModal.setAttribute('hidden', '');
}

editProfileBtn.addEventListener('click', openModal);
cancelEditBtn.addEventListener('click', closeModal);

saveProfileBtn.addEventListener('click', () => {
  const newName = editName.value.trim();
  const newBio = editBio.value.trim();
  if (newName) {
    profileName.textContent = newName;
  }
  profileBio.textContent = newBio;
  closeModal();
});

// Close modal when clicking outside
editModal.addEventListener('click', (e) => {
  if (e.target === editModal) {
    closeModal();
  }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !editModal.hasAttribute('hidden')) {
    closeModal();
  }
});
