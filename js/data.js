// Data State Store for Synapse 2026

const defaultEvents = [
    { id: 1, name: "Battle of the Bands", category: "Cultural", fee: 500, day: 2, time: "5:00 PM - 9:00 PM", venue: "Main Stage", desc: "Live music competition for college rock bands." },
    { id: 2, name: "Futsal Championship", category: "Sports", fee: 300, day: 1, time: "10:00 AM - 4:00 PM", venue: "OBH Ground", desc: "5v5 fast-paced indoor-style football tournament." },
    { id: 3, name: "Call of Duty / PUBG Mobile", category: "E-Sports", fee: 200, day: 1, time: "2:00 PM - 6:00 PM", venue: "LT-1 Gaming Zone", desc: "Squad battle royale tournament." },
    { id: 4, name: "Western Group Dance", category: "Cultural", fee: 400, day: 2, time: "2:00 PM - 5:00 PM", venue: "Main Auditorium", desc: "Inter-college choreo dance competition." },
    { id: 5, name: "Star Night - Celebrity Pass", category: "Flagship", fee: 0, day: 3, time: "7:00 PM Onwards", venue: "Main Grounds", desc: "Exclusive entry pass for live concert night." }
];

function getEvents() {
    const saved = localStorage.getItem("synapse_events");
    return saved ? JSON.parse(saved) : defaultEvents;
}

function saveEventsData(events) {
    localStorage.setItem("synapse_events", JSON.stringify(events));
    renderEventsGrid();
    renderSchedule();
    if (typeof updateAdminStats === "function") { updateAdminStats(); }
}

function getUserRegistrations() {
    const saved = localStorage.getItem("synapse_user_regs");
    return saved ? JSON.parse(saved) : [];
}

function saveUserRegistrationData(regs) {
    localStorage.setItem("synapse_user_regs", JSON.stringify(regs));
    updateNavCount();
    if (typeof updateAdminStats === "function") { updateAdminStats(); }
}

function initData() {
    if (!localStorage.getItem("synapse_events")) {
        localStorage.setItem("synapse_events", JSON.stringify(defaultEvents));
    }
}

function updateNavCount() {
    const count = getUserRegistrations().length;
    const badge = document.getElementById("nav-reg-count");
    if (badge) {
        badge.innerText = count;
        if (count > 0) { badge.classList.remove("hidden"); } else { badge.classList.add("hidden"); }
    }
}
