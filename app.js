const commentForm = document.getElementById("comment-form");
  const commentsContainer = document.getElementById("comments-container");

  commentForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = commentForm.name.value.trim();
    const comment = commentForm.comment.value.trim();

    if (!name || !comment) return;

    await db.collection("comentarios").add({
      name,
      comment,
      timestamp: new Date()
    });

    commentForm.reset();
    cargarComentarios(); 
  });

  async function cargarComentarios() {
    commentsContainer.innerHTML = "";
    const snapshot = await db.collection("comentarios").orderBy("timestamp", "desc").get();
    
    snapshot.forEach(doc => {
      const data = doc.data();
      const commentBox = document.createElement("div");
      commentBox.className = "comment-box";
      commentBox.innerHTML = `
        <strong>${data.name}</strong>
        <p>${data.comment}</p>
      `;
      commentsContainer.appendChild(commentBox);
    });
  }

  // Cargar comentarios
  window.addEventListener("load", cargarComentarios);