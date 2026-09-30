function saveEvent() {
    const idInput = document.getElementById("admin-event-id").value;
    const day = document.getElementById("admin-event-day").value;
    const time = document.getElementById("admin-event-time").value.trim();
    const name = document.getElementById("admin-event-name").value.trim();
    const cat = document.getElementById("admin-event-cat").value.trim();
    const venue = document.getElementById("admin-event-venue").value.trim();
    const status = document.getElementById("admin-event-status").value;

    if (!time || !name || !venue) { alert("Please fill in Time, Event Name, and Venue!"); return; }

    let schedule = getSchedule();
    if (idInput) {
        schedule = schedule.map(ev => ev.id === Number(idInput) ? { id: Number(idInput), day: Number(day), time, name, category: cat, venue, status } : ev);
    } else {
        const newEv = { id: Date.now(), day: Number(day), time, name, category: cat || "General", venue, status };
        schedule.push(newEv);
    }

    saveScheduleData(schedule);
    resetEventForm();
    alert("Schedule updated successfully!");
}

function editEvent(id) {
    const ev = getSchedule().find(e => e.id === id);
    if (!ev) { return; }
    document.getElementById("admin-event-id").value = ev.id;
    document.getElementById("admin-event-day").value = ev.day;
    document.getElementById("admin-event-time").value = ev.time;
    document.getElementById("admin-event-name").value = ev.name;
    document.getElementById("admin-event-cat").value = ev.category;
    document.getElementById("admin-event-venue").value = ev.venue;
    document.getElementById("admin-event-status").value = ev.status;
    document.getElementById("form-title").innerText = `Edit Event: ${ev.name}`;
}

function deleteEvent(id) {
    if (confirm("Are you sure you want to delete this event from the schedule?")) {
        const updated = getSchedule().filter(e => e.id !== id);
        saveScheduleData(updated);
    }
}

function resetEventForm() {
    document.getElementById("admin-event-id").value = "";
    document.getElementById("admin-event-time").value = "";
    document.getElementById("admin-event-name").value = "";
    document.getElementById("admin-event-cat").value = "";
    document.getElementById("admin-event-venue").value = "";
    document.getElementById("form-title").innerText = "Add New Schedule Event";
}

function renderAdminScheduleTable() {
    const tbody = document.getElementById("admin-schedule-table");
    if (!tbody) { return; }
    tbody.innerHTML = "";
    const schedule = getSchedule();

    if (schedule.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="p-3 text-center text-slate-500">No events found. Add one above!</td></tr>`;
        return;
    }

    schedule.forEach(ev => {
        tbody.innerHTML += `<tr><td class="p-2 text-emerald-400 font-bold">Day ${ev.day}</td><td class="p-2 font-bold text-white">${ev.name}</td><td class="p-2 text-slate-400">${ev.time}</td><td class="p-2 text-slate-300">${ev.venue}</td><td class="p-2 text-right space-x-2"><button onclick="editEvent(${ev.id})" class="text-cyan-400 hover:underline">Edit</button><button onclick="deleteEvent(${ev.id})" class="text-red-400 hover:underline">Delete</button></td></tr>`;
    });
}

function verifyPass() {
    const input = document.getElementById("scan-input").value.trim();
    const res = document.getElementById("scan-result");
    res.classList.remove("hidden");
    if (input.length > 3) {
        res.className = "p-3 rounded-xl text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40";
        res.innerHTML = "✅ VALID PASS: Entry Approved for Campus & Main Stage.";
    } else {
        res.className = "p-3 rounded-xl text-xs font-semibold bg-red-500/20 text-red-300 border border-red-500/40";
        res.innerHTML = "❌ INVALID PASS ID: Record not found.";
    }
}
