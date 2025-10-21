// Query important elements
const tabNav = document.getElementById('tabNav'); // the tab bar
const banner = document.getElementById('banner'); // the top banner
const tabLinks = document.querySelectorAll('.tab-link'); // all tab anchor links
const sections = Array.from(document.querySelectorAll('main section')); // page sections in order

// Smooth scroll for clicks on tabs
tabLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault(); // prevent default jump
    const targetId = link.getAttribute('data-target'); // section id
    const targetEl = document.getElementById(targetId);
    if (!targetEl) return;
    targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' }); // smooth scroll
    // update active class instantly for responsiveness
    document.querySelectorAll('.tab-link').forEach(a => a.classList.remove('active'));
    link.classList.add('active');
  });
});

// Sticky behavior: when banner leaves viewport, make nav fixed
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      tabNav.classList.add('sticky'); // add sticky when banner not visible
    } else {
      tabNav.classList.remove('sticky'); // remove sticky when banner visible
    }
  });
}, { root: null, threshold: 0, rootMargin: `-${tabNav.offsetHeight}px 0px 0px 0px` }); // adjust for nav height

observer.observe(banner); // observe the banner

// Scroll spy to highlight the tab corresponding to the current section
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.id;
    const tab = document.querySelector(`.tab-link[data-target="${id}"]`);
    if (entry.isIntersecting) {
      document.querySelectorAll('.tab-link').forEach(a => a.classList.remove('active'));
      if (tab) tab.classList.add('active');
    }
  });
}, { root: null, threshold: 0.55 }); // consider a section active when 55% visible

sections.forEach(sec => sectionObserver.observe(sec));
