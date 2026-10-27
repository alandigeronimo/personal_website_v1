// Builds the cards on the Work page.
// The jobs, projects, and dates live in assets/data/personal/work.js

const workList = document.getElementById("work-list");

// Turns a list of links into HTML. Returns nothing if there are no links.
function createLinks(links) {
  if (!links || links.length === 0) {
    return "";
  }
  const items = links
    .map((link) => `<a href="${link.url}" target="_blank" rel="noopener">${link.label}</a>`)
    .join("");
  return `<div class="work-links">${items}</div>`;
}

// One project inside a job
function createProject(project) {
  const title = project.title ? `<h4 class="work-project-title">${project.title}</h4>` : "";
  const description = project.description
    ? `<p class="work-project-text">${project.description}</p>`
    : "";
  // Expandable details only appear if the project has "details" text
  const details = project.details
    ? `<details class="work-details"><summary>More details</summary><p class="work-project-text">${project.details}</p></details>`
    : "";

  return `
    <div class="work-project">
      ${title}
      ${description}
      ${details}
      ${createLinks(project.links)}
    </div>
  `;
}

// Split "Sell-Side: Sale of …" into a small type label and the rest of the title.
// Titles without a colon are shown as-is.
function splitDealTitle(title) {
  const index = title.indexOf(": ");
  if (index === -1) {
    return { type: "", name: title };
  }
  return { type: title.slice(0, index), name: title.slice(index + 2) };
}

// One deal inside a group. The title is a link (opens in a new tab) when the deal has a url.
function createDeal(deal) {
  const parts = splitDealTitle(deal.title);
  const type = parts.type ? `<span class="work-deal-label">${parts.type}</span>` : "";
  const name = deal.url
    ? `<a href="${deal.url}" target="_blank" rel="noopener">${parts.name}</a>`
    : parts.name;
  const description = deal.description
    ? `<p class="work-project-text">${deal.description}</p>`
    : "";
  // Optional second line: plain text, or a sentence where only part of it is a link
  let note = "";
  if (typeof deal.note === "string") {
    note = `<p class="work-project-text">${deal.note}</p>`;
  } else if (deal.note) {
    note = `<p class="work-project-text">${deal.note.before}<a href="${deal.note.url}" target="_blank" rel="noopener">${deal.note.linkText}</a>${deal.note.after}</p>`;
  }

  return `
    <div class="work-project">
      ${type}
      <h5 class="work-project-title">${name}</h5>
      ${description}
      ${note}
    </div>
  `;
}

// A heading (like "Other Publicly Announced Deals:") followed by its deals
function createDealGroup(group) {
  const heading = group.heading
    ? `<h4 class="work-deal-group-heading">${group.heading}</h4>`
    : "";

  // An optional testimonial shown in a soft gray box after the deals
  const quote = group.quote
    ? `<blockquote class="work-quote">
        <div class="work-quote-text">${group.quote.text}</div>
        <div class="work-quote-attribution">${group.quote.attribution}</div>
      </blockquote>`
    : "";

  const featured = group.heading && /key project/i.test(group.heading) ? " is-featured" : "";

  return `
    <div class="work-deal-group${featured}">
      ${heading}
      <div class="work-deals">${group.deals.map(createDeal).join("")}</div>
      ${quote}
    </div>
  `;
}

// One line inside a facts list. Names marked "highlight" are bold; the detail after the dash is lighter.
function createFactItem(item) {
  const nameClass = item.highlight ? "work-fact-name is-highlight" : "work-fact-name";
  const detail = item.detail ? `<span class="work-fact-detail"> – ${item.detail}</span>` : "";
  // Optional nested bullets: item.sub is a list of short lines shown one step in under this bullet
  const sub = item.sub && item.sub.length > 0 ? `<ul>${item.sub.map((line) => `<li>${line}</li>`).join("")}</ul>` : "";
  return `<li><span class="${nameClass}">${item.name}</span>${detail}${sub}</li>`;
}

// A small label (like "Honors") followed by its list of items
function createFact(fact) {
  // The label is optional: with no label, the list sits directly under the entry title
  const label = fact.label ? `<h4 class="work-fact-label">${fact.label}</h4>` : "";
  return `
    <div class="work-fact">
      ${label}
      <ul class="work-fact-list${fact.bullets ? " has-bullets" : ""}">${fact.items.map(createFactItem).join("")}</ul>
    </div>
  `;
}

// One group of career-break experiences: a small label, then bigger tiles, then small tag pills
function createQuestGroup(group) {
  const tiles =
    group.featured && group.featured.length > 0
      ? `<div class="work-quest-tiles">${group.featured
          .map(
            (tile) => `
        <div class="work-quest-tile">
          <div class="work-quest-title">${tile.title}</div>
          ${tile.detail ? `<div class="work-quest-detail">${tile.detail}</div>` : ""}
        </div>`
          )
          .join("")}</div>`
      : "";
  const tags =
    group.tags && group.tags.length > 0
      ? `<ul class="work-tags">${group.tags.map((tag) => `<li>${tag}</li>`).join("")}</ul>`
      : "";

  return `
    <div class="work-quest-group">
      <h4 class="work-fact-label">${group.label}</h4>
      ${tiles}
      ${tags}
    </div>
  `;
}

// One entry (a job, school, or business) inside a chapter. Empty fields are left out.
// If the entry has the same name as its chapter heading (like Piper Sandler), the name isn't shown
// a second time, because the chapter heading already says it.
function createWorkCard(job, chapterHeading) {
  const role = job.role ? `<div class="work-role">${job.role}</div>` : "";
  const location = job.location ? `<div class="work-location">${job.location}</div>` : "";
  const dates = job.dates ? `<div class="work-dates">${job.dates}</div>` : "";
  const description = job.description
    ? `<p class="work-description">${job.description}</p>`
    : "";
  // Optional second line under the description: plain text, or text with part of it as a link
  let note = "";
  if (typeof job.note === "string") {
    note = `<p class="work-description">${job.note}</p>`;
  } else if (job.note) {
    const repoLink = `<a class="work-github-repo" href="${job.note.url}" target="_blank" rel="noopener noreferrer">${job.note.linkText}</a>`;
    note = `<div class="work-github-wrap">${job.note.before || ""}${repoLink}${job.note.after || ""}</div>`;
  }
  const projects =
    job.projects && job.projects.length > 0
      ? `<div class="work-projects">${job.projects.map(createProject).join("")}</div>`
      : "";
  const dealGroups =
    job.dealGroups && job.dealGroups.length > 0
      ? job.dealGroups.map(createDealGroup).join("")
      : "";
  const facts =
    job.facts && job.facts.length > 0
      ? `<div class="work-facts">${job.facts.map(createFact).join("")}</div>`
      : "";

  const quests =
    job.quests && job.quests.length > 0
      ? `<div class="work-quests">${job.quests.map(createQuestGroup).join("")}</div>`
      : "";
  const showName = job.organization !== chapterHeading;
  // If the entry has a link (like TwinTail Brews), only the chosen words in the name become the link
  const name = job.organizationUrl
    ? job.organization.replace(
        job.organizationLinkText,
        `<a href="${job.organizationUrl}" target="_blank" rel="noopener">${job.organizationLinkText}</a>`
      )
    : job.organization;
  const header =
    showName || job.dates
      ? `<div class="work-card-header">
        ${showName ? `<h3>${name}</h3>` : ""}
        ${dates}
      </div>`
      : "";

  return `
    <article class="work-card">
      ${header}
      ${role}
      ${location}
      ${description}
      ${facts}
      ${note}
      ${createLinks(job.links)}
      ${projects}
      ${dealGroups}
      ${quests}
    </article>
  `;
}

// One deal tile in a "Select Deal Experience" list. Empty fields are left out.
function createDealCard(deal) {
  const company = deal.url
    ? `<a href="${deal.url}" target="_blank" rel="noopener">${deal.company}</a>`
    : deal.company || "";
  const logo = deal.logo
    ? `<div class="work-deal-logo"><img src="${deal.logo}" alt="${deal.company || "Company"} logo" loading="lazy" /></div>`
    : "";
  const type = deal.type ? `<span class="work-deal-type">${deal.type}</span>` : "";
  const description = deal.description
    ? `<p class="work-deal-description">${deal.description}</p>`
    : "";
  const value = deal.value
    ? `<div class="work-deal-value"><span class="work-deal-value-label">Deal Value</span><span>${deal.value}</span></div>`
    : "";

  return `
    <article class="work-deal-card">
      <div class="work-deal-top">
        ${logo}
        <div class="work-deal-heading">
          <h4 class="work-deal-company">${company}</h4>
          ${type}
        </div>
      </div>
      ${description}
      ${value}
    </article>
  `;
}

// The "Select Deal Experience" subsection at the bottom of a chapter.
// With no deals yet, it shows a quiet placeholder tile instead of an empty gap.
function createDealExperience(experience) {
  if (!experience) {
    return "";
  }
  const deals =
    experience.deals && experience.deals.length > 0
      ? `<div class="work-deal-grid">${experience.deals.map(createDealCard).join("")}</div>`
      : `<div class="work-deal-empty">[Placeholder: deals to be added]</div>`;

  return `
    <div class="work-deal-experience">
      <h3 class="work-deal-experience-heading">${experience.heading}</h3>
      ${deals}
    </div>
  `;
}

// One chapter: a single card with its big heading at the top and its entries underneath
function createChapter(section) {
  const entries = section.entries.map((entry) => createWorkCard(entry, section.heading)).join("");
  // An optional smaller, gray phrase on the same line as the heading (like the role)
  const detail = section.headingDetail
    ? ` <span class="work-chapter-detail">${section.headingDetail}</span>`
    : "";

  return `
    <section class="card work-chapter">
      <h2 class="work-chapter-heading">${section.heading}${detail}</h2>
      <div class="work-chapter-cards">${entries}</div>
      ${createDealExperience(section.dealExperience)}
    </section>
  `;
}

workList.innerHTML = workSections.map(createChapter).join("");
