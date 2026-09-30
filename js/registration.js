let selectedActiveCategory = "All";

function filterEvents(category) {
    selectedActiveCategory = category;
    document.querySelectorAll(".cat-filter-btn").forEach(btn => {
        btn.className = "cat-filter-btn px-3 py-1 text-xs font-bold rounded-lg border border-slate-800 bg-slate-900 text-slate-400";
    });
    if (event && event.currentTarget) {
        event.currentTarget.className = "cat-filter-btn px-3 py-1 text-xs font-bold rounded-lg border border-emerald-500/50 bg-emerald-500/20 text-emerald-300";
    }
    renderEventsGrid();
}

function renderEventsGrid() {
    const container = document.getElementById("events-grid");
    if (!container) { return; }
    container.innerHTML = "";

    const allEvents = getEvents();
    const userRegs = getUserRegistrations();
    const filtered = selectedActiveCategory === "All" ? allEvents : allEvents.filter(e => e.category === selectedActiveCategory);

    filtered.forEach(ev => {
        const isRegistered = userRegs.some(r => r.eventId === ev.id);
        const feeBadge = ev.fee === 0 ? "<span class='text-emerald-400 font-bold text-sm'>Free</span>" : `<span class='text-white font-bold text-sm'>₹${ev.fee}</span>`;
        
        let actionButton = `<button onclick="openRegistrationModal(${ev.id})" class="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs transition">Register Now</button>`;
        if (isRegistered) {
            actionButton = `<button onclick="switchTab('my-registrations')" class="w-full py-2 bg-slate-800 border border-emerald-500/40 text-emerald-400 font-bold rounded-xl text-xs flex items-center justify-center space-x-1"><span>Registered (View Pass)</span></button>`;
        }

        container.innerHTML += `
            <div class="glass-panel p-5 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition flex flex-col justify-between space-y-4">
                <div class="space-y-2">
                    <div class="flex justify-between items-start">
                        <span class="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">${ev.category}</span>
                        <span class="text-xs text-slate-400 font-medium">Day ${ev.day}</span>
                    </div>
                    <h3 class="text-lg font-bold text-white">${ev.name}</h3>
                    <p class="text-xs text-slate-400 line-clamp-2">${ev.desc}</p>
                </div>
                <div class="space-y-3 pt-2 border-t border-slate-800/60">
                    <div class="flex justify-between items-center text-xs text-slate-300">
                        <span>${ev.venue} • ${ev.time}</span>
                        ${feeBadge}
                    </div>
                    ${actionButton}
                </div>
            </div>
        `;
    });
}

function openRegistrationModal(eventId) {
    const ev = getEvents().find(e => e.id === eventId);
    if (!ev) { return; }

    document.getElementById("modal-event-id").value = ev.id;
    document.getElementById("modal-event-title").innerText = `Register for ${ev.name}`;
    document.getElementById("modal-event-details").innerText = `Day ${ev.day} • ${ev.venue} (${ev.time})`;
    document.getElementById("modal-event-price").innerText = ev.fee === 0 ? "FREE" : `₹${ev.fee}`;
    document.getElementById("registration-modal").classList.remove("hidden");
}

function closeRegistrationModal() {
    document.getElementById("registration-modal").classList.add("hidden");
}

function handleRegistrationSubmit(e) {
    e.preventDefault();
    const eventId = Number(document.getElementById("modal-event-id").value);
    const ev = getEvents().find(item => item.id === eventId);
    
    const regRecord = {
        regId: `REG-${Math.floor(1000 + Math.random() * 9000)}`,
        eventId: ev.id,
        eventName: ev.name,
        category: ev.category,
        venue: ev.venue,
        day: ev.day,
        time: ev.time,
        feePaid: ev.fee,
        userName: document.getElementById("reg-user-name").value,
        userCollege: document.getElementById("reg-user-college").value,
        userPhone: document.getElementById("reg-user-phone").value,
        timestamp: new Date().toLocaleDateString()
    };

    const regs = getUserRegistrations();
    regs.push(regRecord);
    saveUserRegistrationData(regs);

    closeRegistrationModal();
    renderEventsGrid();
    switchTab('my-registrations');
}
