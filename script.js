// Helper: Set a cookie with name, value, and days to expire
function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + (days*24*60*60*1000));
  const expires = "expires=" + d.toUTCString();
  document.cookie = `${name}=${value};${expires};path=/`;
}

// Helper: Get cookie by name
function getCookie(name) {
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookies = decodedCookie.split(';');
  for (let c of cookies) {
    c = c.trim();
    if (c.indexOf(name + "=") === 0) {
      return c.substring(name.length + 1);
    }
  }
  return "";
}

// Apply the font preferences to the page
function applyPreferences(fontsize, fontcolor) {
  document.documentElement.style.setProperty('--fontsize', fontsize + "px");
  document.documentElement.style.setProperty('--fontcolor', fontcolor);
}

// On page load, check cookies and apply preferences if they exist
window.addEventListener('DOMContentLoaded', () => {
  const savedFontSize = getCookie("fontsize");
  const savedFontColor = getCookie("fontcolor");

  if (savedFontSize && savedFontColor) {
    applyPreferences(savedFontSize, savedFontColor);
    document.getElementById("fontsize").value = savedFontSize;
    document.getElementById("fontcolor").value = savedFontColor;
  }
});

// Handle form submission
document.querySelector("form").addEventListener("submit", function(e) {
  e.preventDefault();

  const fontsizeInput = document.getElementById("fontsize").value;
  const fontcolorInput = document.getElementById("fontcolor").value;

  // Save preferences in cookies
  setCookie("fontsize", fontsizeInput, 7);
  setCookie("fontcolor", fontcolorInput, 7);

  // Apply preferences immediately
  applyPreferences(fontsizeInput, fontcolorInput);
});

