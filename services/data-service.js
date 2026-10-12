import { DEFAULT_EVENTS } from '../data/default-events.js';
import { DEFAULT_SPONSORS } from '../data/default-sponsors.js';
import { DEFAULT_PASSES } from '../data/default-passes.js';

class DataService {
  constructor() {
    this.eventsKey = "synapse_events_v10";
    this.sponsorsKey = "synapse_sponsors_v10";
    this.passesKey = "synapse_passes_v10";
    this.regsKey = "synapse_regs_v10";
  }

  // --- EVENTS CRUD ---
  async getEvents() {
    try {
      const local = localStorage.getItem(this.eventsKey);
      if (local) return JSON.parse(local);
    } catch (e) {
      console.warn("Storage fetch fallback triggered:", e);
    }
    return DEFAULT_EVENTS;
  }

  async saveEvent(eventData) {
    const events = await this.getEvents();
    const index = events.findIndex(e => e.id === eventData.id);
    
    if (index >= 0) {
      events[index] = { ...events[index], ...eventData, updatedAt: new Date().toISOString() };
    } else {
      events.unshift({ ...eventData, id: "ev-" + Date.now(), createdAt: new Date().toISOString() });
    }

    localStorage.setItem(this.eventsKey, JSON.stringify(events));
    return events;
  }

  async deleteEvent(eventId) {
    let events = await this.getEvents();
    events = events.filter(e => e.id !== eventId);
    localStorage.setItem(this.eventsKey, JSON.stringify(events));
    return events;
  }

  // --- SPONSORS CRUD ---
  async getSponsors() {
    try {
      const local = localStorage.getItem(this.sponsorsKey);
      if (local) return JSON.parse(local);
    } catch (e) {
      console.warn("Sponsors fallback triggered");
    }
    return DEFAULT_SPONSORS;
  }

  async saveSponsor(sponsorData) {
    const sponsors = await this.getSponsors();
    const index = sponsors.findIndex(s => s.id === sponsorData.id);

    if (index >= 0) {
      sponsors[index] = { ...sponsors[index], ...sponsorData };
    } else {
      sponsors.unshift({ ...sponsorData, id: "sp-" + Date.now() });
    }

    localStorage.setItem(this.sponsorsKey, JSON.stringify(sponsors));
    return sponsors;
  }

  // --- PASSES READ ---
  async getPasses() {
    try {
      const local = localStorage.getItem(this.passesKey);
      if (local) return JSON.parse(local);
    } catch (e) {}
    return DEFAULT_PASSES;
  }
}

export const dataService = new DataService();
