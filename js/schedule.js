const day2Events = [
    { time: "9:00 AM - 1:00 PM", name: "Limca Quiz", category: "Quiz", venue: "Old LT GF", status: "Completed" },
    { time: "1:00 PM - 6:00 PM", name: "FIFA Tournament", category: "E-Sports", venue: "Biochem Demo Room", status: "Completed" },
    { time: "9:00 AM - 3:00 PM", name: "Prodigy Dance", category: "Music", venue: "Auditorium", status: "Completed" },
    { time: "All Day", name: "Laser Tag", category: "Fun Games", venue: "OBH Basketball Court", status: "Active" }
];

const day3Events = [
    { time: "9:00 AM - 4:00 PM", name: "Medi Junior", category: "Academic", venue: "New LT GF", status: "Completed" },
    { time: "4:00 PM - 6:00 PM", name: "IPL Auction", category: "Fun Event", venue: "New LT GF", status: "Completed" },
    { time: "6:00 PM Onwards", name: "Prom Night (Humsafar Band + DJ Nitesh)", category: "Flagship", venue: "Spandan", status: "Completed" }
];

const day5Events = [
    { time: "9:00 AM - 4:00 PM", name: "Major Quiz + SciBiz Tech Quiz", category: "Quiz", venue: "New LT GF", status: "Completed" },
    { time: "10:00 AM - 2:00 PM", name: "Western Group Dance", category: "Dance", venue: "Main Stage", status: "Completed" },
    { time: "7:00 PM Onwards", name: "Band Night (Ahsaas Band)", category: "Star Night", venue: "Main Stage", status: "Live Now" },
    { time: "8:00 PM Onwards", name: "DJ Night", category: "Star Night", venue: "Main Stage", status: "Upcoming" }
];

function loadDay(dayNum) {
    const tbody = document.getElementById("schedule-table-body");
    tbody.innerHTML = "";
    let events = day5Events;
    if (dayNum === 2) { events = day2Events; }
    if (dayNum === 3) { events = day3Events; }

    document.querySelectorAll(".day-tab").forEach(btn => { btn.className = "day-tab px-3 py-1.5 text-xs font-bold rounded-lg border border-slate-800 bg-slate-900 text-slate-400"; });
    document.getElementById(`day-btn-${dayNum}`).className = "day-tab px-3 py-1.5 text-xs font-bold rounded-lg border border-emerald-500/50 bg-emerald-500/20 text-emerald-300";

    events.forEach(ev => {
        let let currentSelectedDay = 1;

const defaultSchedule = [
    { id: 101, day: 1, time: "9:00 AM - 1:00 PM", name: "Opening Ceremony", category: "General", venue: "Auditorium", status: "Completed" },
    { id: 102, day: 1, time: "2:00 PM - 6:00 PM", name: "Futsal Tournament", category: "Sports", venue: "OBH Ground", status: "Active" },
    { id: 103, day: 2, time: "10:00 AM - 2:00 PM", name: "Western Group Dance", category: "Dance", venue: "Main Stage", status: "Upcoming" },
    { id: 104, day: 3, time: "7:00 PM Onwards", name: "Star Night", category: "Flagship", venue: "Main Stage", status: "Live Now" }
];

function getSchedule() {
    const saved = localStorage.getItem("synapse_schedule");
    return saved ? JSON.parse(saved) : defaultSchedule;
}

function saveScheduleData(data) {
    localStorage.setItem("synapse_schedule", JSON.stringify(data));
    renderSchedule();
    if (typeof renderAdminScheduleTable === "function") { renderAdminScheduleTable(); }
}

function initSchedule() {
    if (!localStorage.getItem("synapse_schedule")) { localStorage.setItem("synapse_schedule", JSON.stringify(defaultSchedule)); }
    renderSchedule();
}

function switchDay(dayNum) {
    currentSelectedDay = dayNum;
    document.querySelectorAll(".day-tab").forEach(btn => { btn.className = "day-tab px-3 py-1.5 text-xs font-bold rounded-lg border border-slate-800 bg-slate-900 text-slate-400"; });
    const activeBtn = document.getElementById(`day-btn-${dayNum}`);
    if (activeBtn) { activeBtn.className = "day-tab px-3 py-1.5 text-xs font-bold rounded-lg border border-emerald-500/50 bg-emerald-500/20 text-emerald-300"; }
    renderSchedule();
}

function renderSchedule() {
    const tbody = document.getElementById("schedule-table-body");
    if (!tbody) { return; }
    tbody.innerHTML = "";
    const events = getSchedule().filter(e => Number(e.day) === Number(currentSelectedDay));

    if (events.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="py-6 text-center text-slate-500 text-xs">No events scheduled for Day ${currentSelectedDay} yet.</td></tr>`;
        return;
    }

    events.forEach(ev => {
        let badgeClass = "bg-slate-800 text-slate-400 border border-slate-700";
        if (ev.status === "Live Now") { badgeClass = "bg-red-500/20 text-red-400 border border-red-500/30 font-bold animate-pulse"; }
        if (ev.status === "Active") { badgeClass = "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"; }

        tbody.innerHTML += `<tr class="hover:bg-slate-900/40 transition"><td class="py-3 px-4 font-mono text-xs text-slate-400">${ev.time}</td><td class="py-3 px-4 font-bold text-white">${ev.name}</td><td class="py-3 px-4"><span class="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 border border-slate-700/80">${ev.category}</span></td><td class="py-3 px-4 text-slate-300">${ev.venue}</td><td class="py-3 px-4 text-right"><span class="px-2 py-0.5 rounded text-[10px] ${badgeClass}">${ev.status}</span></td></tr>`;
    });
}

function switchTab(tabId) {
    document.querySelectorAll(".tab-content").forEach(el => { el.classList.add("hidden"); });
    document.getElementById(`sec-${tabId}`).classList.remove("hidden");
    document.querySelectorAll(".nav-btn").forEach(btn => { btn.className = "nav-btn px-4 py-2 rounded-lg text-sm font-semibold text-slate-300 hover:text-white transition"; });
    if (event && event.currentTarget) { event.currentTarget.className = "nav-btn px-4 py-2 rounded-lg text-sm font-semibold text-emerald-400 bg-slate-800/60 transition"; }
    if (tabId === "admin" && typeof renderAdminScheduleTable === "function") { renderAdminScheduleTable(); }
}
 = "bg-slate-800 text-slate-400 border border-slate-700";
        if (ev.status === "Live Now") { badgeClass = "bg-red-500/20 text-red-400 border border-red-500/30 font-bold animate-pulse"; }
        if (ev.status === "Active") { badgeClass = "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"; }

        tbody.innerHTML += `<tr class="hover:bg-slate-900/40 transition"><td class="py-3 px-4 font-mono text-xs text-slate-400">${ev.time}</td><td class="py-3 px-4 font-bold text-white">${ev.name}</td><td class="py-3 px-4"><span class="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 border border-slate-700/80">${ev.category}</span></td><td class="py-3 px-4 text-slate-300">${ev.venue}</td><td class="py-3 px-4 text-right"><span class="px-2 py-0.5 rounded text-[10px] ${badgeClass}">${ev.status}</span></td></tr>`;
    });
}

function switchTab(tabId) {
    document.querySelectorAll(".tab-content").forEach(el => { el.classList.add("hidden"); });
    document.getElementById(`sec-${tabId}`).classList.remove("hidden");
    document.querySelectorAll(".nav-btn").forEach(btn => { btn.className = "nav-btn px-4 py-2 rounded-lg text-sm font-semibold text-slate-300 hover:text-white transition"; });
    if (event && event.currentTarget) { event.currentTarget.className = "nav-btn px-4 py-2 rounded-lg text-sm font-semibold text-emerald-400 bg-slate-800/60 transition"; }
}
