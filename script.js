const themeToggle = document.getElementById("themeToggle");
const addNoteBtn = document.getElementById("addNote");
const noteForm = document.getElementById("noteForm");
const noteInput = document.getElementById("noteInput");
const saveNoteBtn = document.getElementById("saveNote");
const cancelNoteBtn = document.getElementById("cancelNote");
const notesContainer = document.getElementById("notesContainer");

// Function to load notes from local storage
const loadNotes = () => {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.forEach((note) => addNoteElement(note));
};

//Saving Notes to Local Storage
const saveNotes = () => {
  const notes = []; 
  document.querySelectorAll(".note textarea").forEach((textarea) => {
    notes.push(textarea.value); 
  });
  localStorage.setItem("notes", JSON.stringify(notes));
};

// Function to add a new note to the UI
const addNoteElement = (text = "") => {
  const noteDiv = document.createElement("div");
  noteDiv.classList.add("note");
  
  noteDiv.innerHTML = `
    <textarea readonly>${text}</textarea> <!-- Read-only textarea to display the note -->
    <button class="edit-btn">✏️ Edit</button> <!-- Button to edit the note -->
    <button class="delete-btn">🗑 Delete</button> <!-- Button to delete the note -->
  `;
  
  // Add the note div to the notes container
  notesContainer.appendChild(noteDiv);

  // Get references to the textarea, edit button, and delete button inside this note
  const textarea = noteDiv.querySelector("textarea");
  const editBtn = noteDiv.querySelector(".edit-btn");
  const deleteBtn = noteDiv.querySelector(".delete-btn");
  
//Add the Note to the Page and Add Event Listeners
  editBtn.addEventListener("click", () => {
    if (textarea.hasAttribute("readonly")) {
      textarea.removeAttribute("readonly");
      editBtn.textContent = "💾 Save"; 
    } else {
      textarea.setAttribute("readonly", true);
      editBtn.textContent = "✏️ Edit"; 
      
      saveNotes();
    }
  });

  deleteBtn.addEventListener("click", () => {
    if (confirm("Delete this note?")) {
      noteDiv.remove(); 
      saveNotes(); 
    }
  });
};

// Function to show the note form
const showNoteForm = () => {
  noteForm.classList.remove("hidden");
};

// Function to hide the note form
const hideNoteForm = () => {
  noteForm.classList.add("hidden"); 
  noteInput.value = ""; 
};

// Function to save a new note
const saveNewNote = () => {
  const noteText = noteInput.value.trim(); 
  
  // Check if the input is not empty
  if (noteText) {
    addNoteElement(noteText); 
    saveNotes(); 
    hideNoteForm(); 
  } else {
    alert("Note cannot be empty!"); 
  }
};

// Add event listener for the "Add Note" button
addNoteBtn.addEventListener("click", showNoteForm);

// Add event listener for the "Cancel Note" button
cancelNoteBtn.addEventListener("click", hideNoteForm); 

// Add event listener for the "Save Note" button
saveNoteBtn.addEventListener("click", saveNewNote); 

// Add event listener for the theme toggle button
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark"); 
  
  const isDarkMode = document.body.classList.contains("dark");

  themeToggle.textContent = isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode";
});
loadNotes();
