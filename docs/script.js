document.addEventListener("DOMContentLoaded", async function () {
    const categories = ["minimal", "creative", "developer-focused", "animated", "stats-heavy"];
    const profilesDiv = document.getElementById("profiles");

    for (const category of categories) {
        try {
            const response = await fetch(`../profiles/${category}.txt`);
            if (!response.ok) continue;

            const text = await response.text();
            const links = text.split("\n").filter(link => link.trim() !== "");

            if (links.length > 0) {
                const categoryDiv = document.createElement("div");
                categoryDiv.innerHTML = `<h3>${category.replace("-", " ").toUpperCase()}</h3><ul></ul>`;
                const list = categoryDiv.querySelector("ul");

                links.forEach(link => {
                    list.innerHTML += `<li><a href="${link}" target="_blank">${link.replace("https://github.com/", "")}</a></li>`;
                });

                profilesDiv.appendChild(categoryDiv);
            }
        } catch (error) {
            console.error(`Failed to load ${category}.txt`, error);
        }
    }
});
