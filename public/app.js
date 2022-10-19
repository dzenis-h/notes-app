const addBtn = document.getElementById("add");
const existingNotes = JSON.parse(localStorage.getItem("notes"));

const updateLS = () => {
  const data = document.querySelectorAll("textarea");
  const notes = [];

  data.forEach((note) => notes.push(note.value));
  localStorage.setItem("notes", JSON.stringify(notes));
};

addBtn.addEventListener("click", () => addNew());

const addNew = (text = "") => {
  const note = document.createElement("div");
  note.classList.add("note");

  note.innerHTML = `
    <div class="tools">
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
  </div>
  <div class="main ${text ? "" : "hidden"}"></div>
  <textarea class=${text ? "hidden" : ""}></textarea>`;

  const deleteBtn = note.querySelector(".delete");
  const editBtn = note.querySelector(".edit");
  const main = note.querySelector(".main");
  const area = note.querySelector("textarea");

  area.value = text;
  main.innerHTML = text;

  deleteBtn.addEventListener("click", () => {
    note.remove();
    updateLS();
  });

  editBtn.addEventListener("click", () => {
    main.classList.toggle("hidden");
    area.classList.toggle("hidden");
  });

  area.addEventListener("input", (e) => {
    const { value } = e.target;
    main.innerHTML = value;
    updateLS();
  });

  document.body.appendChild(note);
};

if (existingNotes) {
  existingNotes.forEach((note) => addNew(note));
}
