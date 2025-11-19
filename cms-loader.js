async function loadJSON(path) {
  const response = await fetch(path);
  return await response.json();
}

async function loadHero() {
  if (!document.getElementById("hero-title-1")) return;
  const hero = await loadJSON("content/hero.json");

  document.getElementById("hero-title-1").textContent = hero.titleLine1;
  document.getElementById("hero-title-2").textContent = hero.titleLine2;
  document.getElementById("hero-subtitle").textContent = hero.subtitle;
  document.getElementById("hero-welcome-title").textContent = hero.welcomeTitle;
  document.getElementById("hero-welcome-text").textContent = hero.welcomeText;
  document.getElementById("hero-image").src = hero.heroImageUrl;
}

async function loadServices() {
  const container = document.getElementById("services-list");
  if (!container) return;

  const folder = "content/services/";
  const files = await fetch(folder).then(res => res.text());

  const jsonFiles = [...files.matchAll(/href="(.*?\.json)"/g)].map(m => m[1]);

  container.innerHTML = "";

  for (const file of jsonFiles) {
    const data = await loadJSON(folder + file);
    container.innerHTML += `
        <div class="col-md-4">
          <div class="service-card">
            <div class="service-img">
              <img src="${data.iconUrl}" />
            </div>
            <h5>${data.name}</h5>
            <p>${data.description}</p>
          </div>
        </div>
        `;
  }
}

async function loadExamples() {
  const container = document.getElementById("examples-list");
  if (!container) return;

  const folder = "content/examples/";
  const files = await fetch(folder).then(res => res.text());

  const jsonFiles = [...files.matchAll(/href="(.*?\.json)"/g)].map(m => m[1]);

  container.innerHTML = "";

  for (const file of jsonFiles) {
    const data = await loadJSON(folder + file);
    container.innerHTML += `
        <div class="col-md-6">
          <div class="product-box d-flex gap-3 align-items-center">
            <div class="circle-img">
              <img src="${data.imageUrl}" />
            </div>
            <div>
              <h5>${data.title}</h5>
              <p>${data.description}</p>
            </div>
          </div>
        </div>
        `;
  }
}

async function loadResources() {
  const container = document.getElementById("resources-list");
  if (!container) return;

  const folder = "content/resources/";
  const files = await fetch(folder).then(res => res.text());

  const jsonFiles = [...files.matchAll(/href="(.*?\.json)"/g)].map(m => m[1]);

  container.innerHTML = "";

  for (const file of jsonFiles) {
    const data = await loadJSON(folder + file);
    container.innerHTML += `
        <div class="col-md-6">
          <div class="product-box d-flex gap-3 align-items-center">
            <div class="circle-img">
              <img src="${data.imageUrl}" />
            </div>
            <div>
              <h5>${data.title}</h5>
              <p>${data.description}</p>
            </div>
          </div>
        </div>
        `;
  }
}

async function loadContact() {
  if (!document.getElementById("contact-phone")) return;
  const data = await loadJSON("content/contact.json");
  document.getElementById("contact-phone").textContent = data.phone;
  document.getElementById("contact-address").textContent = data.address;
}

document.addEventListener("DOMContentLoaded", () => {
  loadHero();
  loadServices();
  loadExamples();
  loadResources();
  loadContact();
});
