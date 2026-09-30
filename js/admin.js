let isAdminUnlocked = false;

function switchTab(tabId) {
    document.querySelectorAll(".tab-content").forEach(el => { el.classList.add("hidden"); });
    document.getElementById(`sec-${tabId}`).classList.remove("hidden");
    
    document.querySelectorAll(".nav-btn").forEach(btn => {
        btn.className = "nav-btn px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-300 hover:text-white transition";
    });
    if (event && event.currentTarget) {
        event.currentTarget.className = "nav-btn px-3.5 py-2 rounded-lg text-xs font-semibold text-emerald-400 bg-slate-800/60 transition";
    }

    if (tabId === "my-registrations") { renderMyRegistrations(); }
    if (tabId === "admin" && isAdminUnlocked) { updateAdminStats(); renderAdminEventsTable(); }
}

function unlockAdmin() {
    const pin = document.getElementById("admin-pin-input").value;
    if (pin === "1234") {
        isAdminUnlocked = true;
        document.getElementById("admin-lock-screen").classList.add("hidden");
        document.getElementById("admin-dashboard").classList.remove("hidden");
        updateAdminStats();
        renderAdminEventsTable();
    } else {
        alert("Incorrect PIN! (Default demo PIN is 1234)");
    }
}

function lockAdmin() {
    isAdminUnlocked = false;
    document.getElementById("admin-pin-input").value = "";
    document.getElementById("admin-lock-screen").classList.remove("hidden");
    document.getElementById("admin-dashboard").classList.add("hidden");
}

function updateAdminStats() {
    const events = getEvents();
    const regs = getUserRegistrations();
    const totalRevenue = regs.reduce((sum, r) => sum + Number(r.feePaid), 0);

    document.getElementById("stat-total-events").innerText = events.length;
    document.getElementById("stat-total-regs").innerText = regs.length;
    document.getElementById("stat-total-rev").innerText = `₹${totalRevenue}`;
}

function saveEvent() {
    const idInput = document.getElementById("admin-event-id").value;
    const name = document.getElementById("admin-event-name").value.trim();
    const cat = document.getElementById("admin-event-cat").value;
    const fee = Number(document.getElementById("admin-event-fee").value || 0);
    const day = Number(document.getElementById("admin-event-day").value);
    const time = document.getElementById("admin-event-time").value.trim();
    const venue = document.getElementById("admin-event-venue").value.trim();
    const desc = document.getElementById("admin-event-desc").value.trim();

    if (!name || !time || !venue) { alert("Please complete required fields (Name, Time, Venue)"); return; }

    let events = getEvents();
    if (idInput) {
        events = events.map(e => e.id === Number(idInput) ? { id: Number(idInput), name, category: cat, fee, day, time, venue, desc } : e);
    } else {
        events.push({ id: Date.now(), name, category: cat, fee, day, time, venue, desc });
    }

    saveEventsData(events);
    resetEventForm();
    renderAdminEventsTable();
}

function editEvent(id) {
    const ev = getEvents().find(e => e.id === id);
    if (!ev) { return; }
    document.getElementById("admin-event-id").value = ev.id;
    document.getElementById("admin-event-name").value = ev.name;
    document.getElementById("admin-event-cat").value = ev.category;
    document.getElementById("admin-event-fee").value = ev.fee;
    document.getElementById("admin-event-day").value = ev.day;
    document.getElementById("admin-event-time").value = ev.time;
    document.getElementById("admin-event-venue").value = ev.venue;
    document.getElementById("admin-event-desc").value = ev.desc;
    document.getElementById("form-title").innerText = `Edit: ${ev.name}`;
}

function deleteEvent(id) {
    if (confirm("Delete this event from fest catalog?")) {
        const updated = getEvents().filter(e => e.id !== id);
        saveEventsData(updated);
        renderAdminEventsTable();
    }
}

function resetEventForm() {
    document.getElementById("admin-event-id").value = "";
    document.getElementById("admin-event-name").value = "";
    document.getElementById("admin-event-fee").value = "";
    document.getElementById("admin-event-time").value = "";
    document.getElementById("admin-event-venue").value = "";
    document.getElementById("admin-event-desc").value = "";
    document.getElementById("form-title").innerText = "Add New Event / Competition";
}

function renderAdminEventsTable() {
    const tbody = document.getElementById("admin-events-table");
    if (!tbody) { return; }
    tbody.innerHTML = "";

    getEvents().forEach(ev => {
        tbody.innerHTML += `
            <tr>
                <td class="p-2 font-bold text-white">${ev.name}</td>
                <td class="p-2 text-slate-400">${ev.category}</td>
                <td class="p-2 text-slate-300">Day ${ev.day} (${ev.time})</td>
                <td class="p-2 font-bold text-emerald-400">₹${ev.fee}</td>
                <td class="p-2 text-right space-x-2">
                    <button onclick="editEvent(${ev.id})" class="text-cyan-400 hover:underline">Edit</button>
                    <button onclick="deleteEvent(${ev.id})" class="text-red-400 hover:underline">Delete</button>
                </td>
            </tr>
        `;
    });
}

function verifyPass() {
    const input = document.getElementById("scan-input").value.trim().toUpperCase();
    const res = document.getElementById("scan-result");
    res.classList.remove("hidden");

    const record = getUserRegistrations().find(r => r.regId.toUpperCase() === input);

    if (record) {
        res.className = "p-3 rounded-xl text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40";
        res.innerHTML = `✅ ENTRY CONFIRMED: ${record.userName} (${record.userCollege}) for ${record.eventName}`;
    } else {
        res.className = "p-3 rounded-xl text-xs font-semibold bg-red-500/20 text-red-300 border border-red-500/40";
        res.innerHTML = "❌ INVALID PASS ID: Registration record not found.";
    }
}
