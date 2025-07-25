// crew.js

document.addEventListener('DOMContentLoaded', () => {
  const tabList = document.querySelector('.dot-indicators');
  const crewRole = document.getElementById('crew-role');
  const crewName = document.getElementById('crew-name');
  const crewBio = document.getElementById('crew-bio');
  const crewImageContainer = document.getElementById('crew-image-container');

  let crewData = []; 
  let currentCrewIndex = 0; 

  async function fetchCrewData() {
      try {
          const response = await fetch('./data.json'); 
          const data = await response.json();
          crewData = data.crew; 
          initializeCrewCarousel();
      } catch (error) {
          console.error('Error fetching crew data:', error);
         
      }
  }

  
  function initializeCrewCarousel() {
      crewData.forEach((crewMember, index) => {
          const button = document.createElement('button');
          button.setAttribute('role', 'tab');
          button.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
          button.setAttribute('aria-controls', `crew-tab-${index}`); 
          button.setAttribute('tabindex', index === 0 ? '0' : '-1');
          button.dataset.index = index;

          const srOnlySpan = document.createElement('span');
          srOnlySpan.classList.add('sr-only');
          srOnlySpan.textContent = `The ${crewMember.role.toLowerCase()}`;
          button.appendChild(srOnlySpan);
          tabList.appendChild(button);
      });

      const tabs = tabList.querySelectorAll('button');

      
      tabList.addEventListener('click', (e) => {
          const clickedButton = e.target.closest('button');
          if (!clickedButton) return;

          const index = parseInt(clickedButton.dataset.index, 10);
          if (!isNaN(index) && index !== currentCrewIndex) {
              showCrewMember(index);
          }
      });

  
      tabList.addEventListener('keydown', (e) => {
          let newIndex = currentCrewIndex;

          if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
              newIndex = (currentCrewIndex + 1) % tabs.length;
          } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
              newIndex = (currentCrewIndex - 1 + tabs.length) % tabs.length;
          } else if (e.key === 'Home') {
              newIndex = 0;
          } else if (e.key === 'End') {
              newIndex = tabs.length - 1;
          } else {
              return; 
          }

          if (newIndex !== currentCrewIndex) {
              e.preventDefault();
              showCrewMember(newIndex);
              tabs[newIndex].focus(); 
          }
      });

      showCrewMember(0);
  }

  
  function showCrewMember(index) {
      if (index < 0 || index >= crewData.length) {
          console.error("Invalid crew member index:", index);
          return;
      }

      const crewMember = crewData[index];
      const tabs = tabList.querySelectorAll('button'); 

      
      crewRole.textContent = crewMember.role;
      crewName.textContent = crewMember.name;
      crewBio.textContent = crewMember.bio;

     
      crewImageContainer.innerHTML = `
          <source srcset="${crewMember.images.webp}" type="image/webp">
          <img src="${crewMember.images.png}" alt="${crewMember.name}">
      `;

     
      tabs.forEach((tab, i) => {
          if (i === index) {
              tab.setAttribute('aria-selected', 'true');
              tab.setAttribute('tabindex', '0');
              document.getElementById('crew-details-container').setAttribute('tabindex', '0');
          } else {
              tab.setAttribute('aria-selected', 'false');
              tab.setAttribute('tabindex', '-1');
          }
      });
    
      if (currentCrewIndex !== index) { 
           document.getElementById('crew-details-container').setAttribute('tabindex', '-1');
      }


      currentCrewIndex = index;
  }


  fetchCrewData();
});
