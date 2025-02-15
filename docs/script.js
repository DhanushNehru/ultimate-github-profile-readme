document.addEventListener("DOMContentLoaded", async function () {
    const categories = ["minimal", "creative", "developer-focused", "animated", "stats-heavy"];
    const profilesDiv = document.getElementById("profiles");

    for (const category of categories) {
        const response = await fetch(`../profiles/${category}/`);
        if (!response.ok) continue;

        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "text/html");
        const files = [...doc.querySelectorAll("a")].map(a => a.href).filter(href => href.endsWith(".md"));

        if (files.length > 0) {
            const categoryDiv = document.createElement("div");
            categoryDiv.innerHTML = `<h3>${category.replace("-", " ").toUpperCase()}</h3><ul></ul>`;
            const list = categoryDiv.querySelector("ul");

            files.forEach(file => {
                const fileName = file.split("/").pop().replace(".md", "");
                const profileLink = `https://github.com/${fileName}`;
                list.innerHTML += `<li><a href="${profileLink}" target="_blank">${fileName}</a></li>`;
            });

            profilesDiv.appendChild(categoryDiv);
        }
    }
});
