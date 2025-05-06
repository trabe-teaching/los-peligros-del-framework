document.addEventListener("DOMContentLoaded", (event) => {
  const button = document.getElementById("button");
  const feedback = document.getElementById("feedback");
  const form = document.getElementById("form");
  const input = document.getElementById("email");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    button.disabled = true;
    button.textContent = "Subscribbing...";
    feedback.innerText = "";

    const formData = new FormData(e.target);

    try {
      const res = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.get("email") }),
      });

      if (!res.ok) {
        throw new Error(`Something went wrong. Status: ${res.statusCode}`);
      }

      const data = await res.json();
      feedback.innerText = `Registered as ${data.email}`;
      input.value = "";
    } catch (error) {
      console.error(error);
      feedback.innerText = "Something went wrong 😅";
    } finally {
      button.disabled = false;
      button.textContent = "Subscribe";
    }
  });
});
