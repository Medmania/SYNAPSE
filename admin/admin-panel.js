import { dataService } from '../services/data-service.js';

export function initAdminPanel(currentUser) {
  if (!currentUser || !currentUser.isAdmin) return;

  const adminContainer = document.getElementById("adminPanelContent");
  if (!adminContainer) return;

  adminContainer.innerHTML = `
    <div class="card-bg p-6 rounded-2xl border space-y-6">
      <div class="flex justify-between items-center border-b pb-4">
        <h3 class="text-lg font-black text-primary">⚙️ SYNAPSE '26 Granular Control Center</h3>
        <span class="text-xs font-mono text-tealPrimary bg-teal-500/10 px-2.5 py-1 rounded-full border border-teal-500/20">Super Admin Mode</span>
      </div>

      <!-- ADMIN SUB-TAB NAVIGATION -->
      <div class="flex gap-2 border-b pb-2">
        <button onclick="switchAdminSubTab('events')" class="admin-subtab font-bold px-3 py-1.5 rounded-xl text-xs bg-tealPrimary text-white">Manage Events</button>
        <button onclick="switchAdminSubTab('sponsors')" class="admin-subtab font-bold px-3 py-1.5 rounded-xl text-xs subtle-bg text-primary">Manage Sponsors</button>
        <button onclick="switchAdminSubTab('passes')" class="admin-subtab font-bold px-3 py-1.5 rounded-xl text-xs subtle-bg text-primary">Pass Pricing & Inventory</button>
      </div>

      <!-- TAB 1: EVENTS MANAGER -->
      <div id="adminTabEvents" class="space-y-4">
        <div class="flex justify-between items-center">
          <h4 class="text-sm font-bold text-primary">Published Events List</h4>
          <button onclick="openAdminEventModal()" class="bg-festOrange text-white font-extrabold px-3 py-1.5 rounded-xl text-xs">+ Create Event</button>
        </div>
        <div id="adminEventsList" class="space-y-2 text-xs"></div>
      </div>

      <!-- TAB 2: SPONSORS MANAGER -->
      <div id="adminTabSponsors" class="hidden space-y-4">
        <div class="flex justify-between items-center">
          <h4 class="text-sm font-bold text-primary">Active Sponsor Partners</h4>
          <button onclick="openAdminSponsorModal()" class="bg-tealPrimary text-white font-extrabold px-3 py-1.5 rounded-xl text-xs">+ Add Sponsor</button>
        </div>
        <div id="adminSponsorsList" class="space-y-2 text-xs"></div>
      </div>

      <!-- TAB 3: PASSES & PRICING -->
      <div id="adminTabPasses" class="hidden space-y-4">
        <h4 class="text-sm font-bold text-primary">Pass Entitlements & Pricing Rules</h4>
        <div id="adminPassesList" class="space-y-2 text-xs"></div>
      </div>
    </div>
  `;

  loadAdminEvents();
}

async function loadAdminEvents() {
  const list = document.getElementById("adminEventsList");
  if (!list) return;

  const events = await dataService.getEvents();
  list.innerHTML = events.map(e => `
    <div class="card-bg p-3 rounded-xl border flex justify-between items-center">
      <div>
        <span class="font-bold text-primary">${e.title}</span>
        <span class="text-muted text-[10px] block">${e.category} • ${e.venue} • ₹${e.price}</span>
      </div>
      <div class="flex gap-2">
        <button onclick="editAdminEvent('${e.id}')" class="text-tealPrimary font-bold">Edit</button>
        <button onclick="deleteAdminEvent('${e.id}')" class="text-red-500 font-bold">Delete</button>
      </div>
    </div>
  `).join("");
}

window.switchAdminSubTab = function(tab) {
  document.getElementById("adminTabEvents").classList.add("hidden");
  document.getElementById("adminTabSponsors").classList.add("hidden");
  document.getElementById("adminTabPasses").classList.add("hidden");

  if (tab === 'events') document.getElementById("adminTabEvents").classList.remove("hidden");
  if (tab === 'sponsors') document.getElementById("adminTabSponsors").classList.remove("hidden");
  if (tab === 'passes') document.getElementById("adminTabPasses").classList.remove("hidden");
};

window.deleteAdminEvent = async function(id) {
  if (!confirm("Are you sure you want to delete this event live?")) return;
  await dataService.deleteEvent(id);
  loadAdminEvents();
  if (window.renderEvents) window.renderEvents();
};
