async function loadJSON(path) {
  const response = await fetch(path);
  if (!response.ok) {
    console.error("Failed to load", path, response.status);
    return null;
  }
  return await response.json();
}

// Cache data.json so we fetch it only once
let siteDataPromise = null;

async function loadData() {
  if (!siteDataPromise) {
    siteDataPromise = loadJSON("content/data.json");
  }
  return await siteDataPromise;
}

async function loadHero() {
  const title1El = document.getElementById("hero-title-1");
  if (!title1El) return; // not on index.html

  const data = await loadData();
  if (!data || !data.hero) return;

  const hero = data.hero;

  document.getElementById("hero-title-1").textContent = hero.titleLine1 || "";
  document.getElementById("hero-title-2").textContent = hero.titleLine2 || "";
  document.getElementById("hero-subtitle").textContent = hero.subtitle || "";
  document.getElementById("hero-welcome-title").textContent = hero.welcomeTitle || "";
  document.getElementById("hero-welcome-text").textContent = hero.welcomeText || "";

  const imgEl = document.getElementById("hero-image");
  if (imgEl && hero.heroImageUrl) {
    imgEl.src = hero.heroImageUrl;
  }
}

async function loadServices() {
  const container = document.getElementById("services-list");
  if (!container) return;

  const data = await loadData();
  const services = (data && data.services) || [];

  container.innerHTML = "";

  services.forEach(service => {
    container.innerHTML += `
      <div class="col-md-4">
        <div class="service-card">
          <div class="service-img">
            <img src="${service.iconUrl || ""}" alt="${service.name || "Service"}" />
          </div>
          <h5 class="mt-2">${service.name || ""}</h5>
          <p>${service.description || ""}</p>
        </div>
      </div>
    `;
  });
}

async function loadExamples() {
  const container = document.getElementById("examples-list");
  if (!container) return;

  const data = await loadData();
  const examples = (data && data.examples) || [];

  container.innerHTML = "";

  examples.forEach(ex => {
    container.innerHTML += `
      <div class="col-md-6">
        <div class="product-box d-flex gap-3 align-items-center">
          <div class="circle-img">
            <img src="${ex.imageUrl || ""}" alt="${ex.title || "Example"}" />
          </div>
          <div>
            <h5>${ex.title || ""}</h5>
            <p>${ex.description || ""}</p>
          </div>
        </div>
      </div>
    `;
  });
}

async function loadResources() {
  const container = document.getElementById("resources-list");
  if (!container) return;

  const data = await loadData();
  const resources = (data && data.resources) || [];

  container.innerHTML = "";

  resources.forEach(res => {
    container.innerHTML += `
      <div class="col-md-6">
        <div class="product-box d-flex gap-3 align-items-center">
          <div class="circle-img">
            <img src="${res.imageUrl || ""}" alt="${res.title || "Resource"}" />
          </div>
          <div>
            <h5>${res.title || ""}</h5>
            <p>${res.description || ""}</p>
          </div>
        </div>
      </div>
    `;
  });
}

async function loadContact() {
  const phoneEl = document.getElementById("contact-phone");
  if (!phoneEl) return; // not on index.html

  const data = await loadData();
  if (!data || !data.contact) return;

  phoneEl.textContent = data.contact.phone || "";
  const addrEl = document.getElementById("contact-address");
  if (addrEl) addrEl.textContent = data.contact.address || "";
}

document.addEventListener("DOMContentLoaded", () => {
  loadHero();
  loadServices();
  loadExamples();
  loadResources();
  loadContact();
});
